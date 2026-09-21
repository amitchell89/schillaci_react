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

/////////////////
// API - User //
///////////////

// API - ADD EMAIL
//
// There is no captcha here any more. The classic reCAPTCHA key this site used
// was retired by Google in September 2026 ("Migrate your key to continue using
// reCAPTCHA"), and the check had not actually run since March 2023 anyway - a
// router registered ahead of the real handler had been shadowing it. Replacing
// it with a Google Cloud key was disproportionate for a form that takes about
// one signup a year, so rate limiting is the bot protection now.

router.post('/api/addEmail', rateLimit.signupLimiter, function(req, res) {
  var payload = req.body || {};
  var email = xss(payload.email || '').trim();

  if (!validator.validate(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  var newEmail = new emailSignup({ email: email });

  newEmail.save(function(saveError, savedEmail) {
    if (saveError) {
      console.error('[addEmail] failed to save signup: ' + saveError.message);
      return res.status(500).json({ message: 'Signup Failure: Server Error' });
    }

    // The signup is safely stored, so the visitor has succeeded regardless of
    // what happens to our notification. Answer them first, then notify.
    res.json({ message: 'You have successfully signed up!', newEmail: savedEmail });

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
});

module.exports = router;
