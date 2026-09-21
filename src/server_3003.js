///////////////////
// Requirements //
/////////////////

// Loaded first so every module below sees the configured environment.
// NB: dotenv reads .env from the process working directory, not from this
// file's directory - start the app from the project root.
require('dotenv').config();

var express = require('express')
var app = express()
var path    = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet')
var xss = require('xss');
var validator = require("email-validator");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailer = require('./api/mailer');
var ContactMessage = require('./api/models/ContactMessage');
var rateLimit = require('./api/rateLimit');

//////////////////
// Helmet setup //
//////////////////

app.use(helmet())
app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////
// MongoDb //
////////////

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schillaci');

// Make db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

/////////////////////
// Mongoose Setup //
///////////////////

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/schillaci');

//////////////
// Contact //
////////////

/**
 * Stores an enquiry before delivery is attempted so a mail outage can never
 * lose one. Never blocks on a database that is down.
 *
 * @param {Object} fields
 * @param {Function} callback called as callback(storedDocumentOrNull)
 */
function storeContactMessage(fields, callback) {
  if (mongoose.connection.readyState !== 1) {
    console.error('[contact] mongo is not connected - this message will not be stored');
    return callback(null);
  }

  var contactMessage = new ContactMessage(fields);

  contactMessage.save(function(error) {
    if (error) {
      console.error('[contact] failed to store message: ' + error.message);
      return callback(null);
    }
    return callback(contactMessage);
  });
}

app.post('/contact', rateLimit.contactFormLimiter, function(req, res) {
  console.log('Step - hit /contact')

  var payload = req.body || {};
  var name = xss(payload.name || '').trim();
  var email = xss(payload.email || '').trim();
  var message = xss(payload.message || '').trim();

  if (!name || !message || !validator.validate(email)) {
    return res.status(400).json({ message: 'Please add your name, a valid email address and a message.' });
  }

  var subject = 'Schillaci Guitars: New Message';
  var emailBody = '<b>From:</b> ' + name + '<br /><br /><b>Email:</b> ' + email + '<br /><br /><b>Message:</b> ' + message;

  storeContactMessage({ name: name, email: email, message: message }, function(stored) {
    mailer.sendMail(subject, emailBody, function(mailError) {
      if (stored) {
        stored.emailed = !mailError;
        stored.emailError = mailError ? mailError.message : null;
        stored.save(function(error) {
          if (error) {
            console.error('[contact] failed to record delivery status: ' + error.message);
          }
        });
      }

      if (mailError) {
        // Tell the visitor rather than thanking them for a message that never
        // arrived. The enquiry is still stored, so nothing is lost either way.
        return res.status(502).json({
          message: "We couldn't send your message right now. Please email us directly at d.schillaciguitars@gmail.com."
        });
      }

      return res.json({ message: 'Your message has been sent! Thank You.' });
    });
  });
});

///////////////////
// Email Signup //
/////////////////

// Registered before the catch-all below so it can never be shadowed again.
var emailRoute = require('./api/routes/addEmail');
app.use(emailRoute);

/////////////
// Router //
////////////

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Catch-all for client side routing - must stay last
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +'/index.html'));
})

app.listen(3003, function () {
  console.log('Site listening on port 3003!')
})
