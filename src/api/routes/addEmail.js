///////////////////
// Requirements //
/////////////////

var express = require('express');
var router = express.Router();
var xss = require('xss');
var validator = require("email-validator");

var emailSignup = require('../models/EmailSignup');
var mailer = require('../mailer');
var rateLimit = require('../rateLimit');
var spamFilter = require('../spamFilter');

/////////////////
// API - User //
///////////////

// API - ADD EMAIL
//
// There is no captcha here any more. The classic reCAPTCHA key this site used
// was retired by Google in September 2026 ("Migrate your key to continue using
// reCAPTCHA"), and the check had not actually run since March 2023 anyway - a
// router registered ahead of the real handler had been shadowing it. Rate
// limiting plus the spam fingerprint in ../spamFilter.js is the protection now.

router.post('/api/addEmail', rateLimit.signupLimiter, function(req, res) {
  var payload = req.body || {};
  var email = xss(payload.email || '').trim();

  if (!validator.validate(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  var normalized = spamFilter.normalizeEmail(email);

  // Match the normalised form, and also any older document stored before this
  // field existed whose raw address happens to equal it
  emailSignup.findOne(
    { $or: [{ normalizedEmail: normalized }, { email: normalized }] },
    function(findError, existing) {
      if (findError) {
        console.error('[addEmail] lookup failed: ' + findError.message);
        return res.status(500).json({ message: 'Signup Failure: Server Error' });
      }

      if (existing) {
        // Already on the list. Answer as though it worked rather than
        // confirming to a stranger who is subscribed, and do not add a
        // duplicate row or send another notification.
        console.log('[addEmail] ignoring duplicate signup for ' + normalized);
        return res.json({ message: 'You have successfully signed up!' });
      }

      var verdict = spamFilter.inspect({ email: email });

      var newEmail = new emailSignup({
        email: email,
        normalizedEmail: normalized,
        spam: verdict.spam
      });

      newEmail.save(function(saveError, savedEmail) {
        if (saveError) {
          console.error('[addEmail] failed to save signup: ' + saveError.message);
          return res.status(500).json({ message: 'Signup Failure: Server Error' });
        }

        // The signup is safely stored, so the visitor has succeeded regardless
        // of what happens next. Answer them first.
        res.json({ message: 'You have successfully signed up!', newEmail: savedEmail });

        if (verdict.spam) {
          // Give the bot a normal looking response so it learns nothing, and
          // keep it out of the inbox. The row is still there to review.
          console.warn('[addEmail] stored but NOT notified, looks automated (' +
                       verdict.reason + '): ' + email);
          return;
        }

        mailer.sendMail(
          'Schillaci Guitars: New Email Signup',
          '<b>New Email Signup:</b> ' + email,
          function(mailError) {
            if (mailError) {
              console.error('[addEmail] signup for ' + email + ' was saved but the notification failed');
            }
          }
        );
      });
    }
  );
});

module.exports = router;
