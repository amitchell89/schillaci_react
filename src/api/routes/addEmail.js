///////////////////
// Requirements //
/////////////////

var express = require('express');
var router = express.Router();
var axios = require('axios');
var xss = require('xss');
var validator = require("email-validator");

var emailSignup = require('../models/EmailSignup');
var mailer = require('../mailer');

////////////////
// reCAPTCHA //
//////////////

// Google's error codes say whose fault a rejection is. Accusing a real person
// of being a bot because OUR secret is wrong is the worst outcome here, so a
// configuration failure lets the signup through and shouts in the log instead.
var SERVER_FAULT_CODES = ['missing-input-secret', 'invalid-input-secret', 'bad-request'];

/**
 * Verifies a reCAPTCHA token with Google.
 *
 * @param {String} token
 * @param {Function} callback called as callback(error, verdict) where verdict is
 *                   { allow: Boolean, reason: String }
 */
function verifyReCaptcha(token, callback) {
  var secret = process.env.RECAPTCHA_SECRET || null;

  if (!secret) {
    console.warn('[addEmail] RECAPTCHA_SECRET is not set - skipping the bot check');
    return callback(null, { allow: true, reason: 'not-configured' });
  }

  if (!token) {
    return callback(null, { allow: false, reason: 'missing' });
  }

  axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    { params: { secret: secret, response: token } }
  ).then(function(verification) {
    // NB: this argument must not be named `res` - doing so shadowed the Express
    // response and left the request hanging whenever the check failed.
    var data = verification.data || {};

    if (data.success) {
      return callback(null, { allow: true, reason: 'verified' });
    }

    var codes = data['error-codes'] || [];
    console.warn('[addEmail] reCAPTCHA rejected: ' + (codes.join(', ') || 'no error codes returned'));

    var isServerFault = codes.some(function(code) {
      return SERVER_FAULT_CODES.indexOf(code) !== -1;
    });

    if (isServerFault) {
      console.error('[addEmail] ^ that is a SERVER misconfiguration, not a bot. RECAPTCHA_SECRET ' +
                    'does not match the site key in src/components/SignUpForm/SignUpForm.js. ' +
                    'Letting the signup through rather than blaming the visitor.');
      return callback(null, { allow: true, reason: 'misconfigured' });
    }

    if (codes.indexOf('timeout-or-duplicate') !== -1) {
      return callback(null, { allow: false, reason: 'expired' });
    }

    return callback(null, { allow: false, reason: 'bot' });
  }).catch(function(error) {
    console.error('[addEmail] reCAPTCHA verification request failed: ' + error.message);
    return callback(error);
  });
}

/////////////////
// API - User //
///////////////

// API - ADD EMAIL

router.post('/api/addEmail', function(req, res) {
  var payload = req.body || {};
  var email = xss(payload.email || '').trim();

  if (!validator.validate(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  verifyReCaptcha(payload.reCaptchaCode, function(error, verdict) {
    if (error) {
      return res.status(502).json({ message: "We couldn't verify the reCAPTCHA. Please try again." });
    }

    if (!verdict.allow) {
      if (verdict.reason === 'expired') {
        return res.status(400).json({ message: 'That captcha expired. Please tick the box again and resubmit.' });
      }

      if (verdict.reason === 'missing') {
        return res.status(400).json({ message: 'Please complete the captcha first.' });
      }

      return res.status(401).json({ message: 'Nice try bot ;)' });
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
});

module.exports = router;
