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

/**
 * Verifies a reCAPTCHA token with Google.
 * @param {String} token
 * @param {Function} callback called as callback(error, isHuman)
 */
function verifyReCaptcha(token, callback) {
  var secret = process.env.RECAPTCHA_SECRET || null;

  if (!secret) {
    console.warn('[addEmail] RECAPTCHA_SECRET is not set - skipping the bot check');
    return callback(null, true);
  }

  if (!token) {
    return callback(null, false);
  }

  axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    { params: { secret: secret, response: token } }
  ).then(function(verification) {
    // NB: this argument must not be named `res` - doing so shadowed the Express
    // response and left the request hanging whenever the check failed.
    return callback(null, !!(verification.data && verification.data.success));
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

  verifyReCaptcha(payload.reCaptchaCode, function(error, isHuman) {
    if (error) {
      return res.status(502).json({ message: "We couldn't verify the reCAPTCHA. Please try again." });
    }

    if (!isHuman) {
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
