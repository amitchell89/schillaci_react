///////////////////
// Requirements //
/////////////////

var nodemailer = require('nodemailer');

////////////////////
// Configuration //
//////////////////

// Everyone who should hear about a new message or signup
var RECIPIENTS = 'aaronmitchellart@gmail.com, d.schillaciguitars@gmail.com';

// Read lazily so this never depends on being required after dotenv has run
function config() {
  return {
    user: process.env.EMAIL_USER || null,
    password: process.env.EMAIL_PASSWORD || null,
    service: process.env.EMAIL_SERVICE || null
  };
}

// NOTE: Gmail stopped accepting plain account passwords over SMTP in May 2022.
// EMAIL_PASSWORD must be a 16 character App Password from
// myaccount.google.com/apppasswords. Changing the Google account password
// revokes it, which silently breaks every form on the site.
var transporter = null;

function getTransporter(settings) {
  if (!transporter) {
    transporter = nodemailer.createTransport("SMTP", {
      service: settings.service,
      auth: {
        user: settings.user,
        pass: settings.password
      }
    });
  }
  return transporter;
}

///////////////////
// Send Emails  //
/////////////////

/**
 * Sends a notification and reports the outcome back to the caller, so routes
 * can decide what to tell the visitor instead of failing silently.
 *
 * @param {String} subject
 * @param {String} message HTML body
 * @param {Function} callback called as callback(error, info)
 */
function sendMail(subject, message, callback) {
  var settings = config();

  if (!settings.user || !settings.password || !settings.service) {
    return callback(new Error('Mail is not configured - check EMAIL_USER, EMAIL_PASSWORD and EMAIL_SERVICE in .env'));
  }

  var mailOptions = {
    from: '"Schillaci Guitars" <' + settings.user + '>',
    to: RECIPIENTS,
    subject: subject,
    text: message.replace(/<br \/>/g, '\n').replace(/<\/?b>/g, ''),
    html: message
  };

  getTransporter(settings).sendMail(mailOptions, function(error, info) {
    transporter.close();

    if (error) {
      console.error('[mailer] FAILED to send "' + subject + '": ' + error.message);
      return callback(error);
    }

    console.log('[mailer] sent "' + subject + '"');
    return callback(null, info);
  });
}

module.exports = {
  sendMail: sendMail,
  RECIPIENTS: RECIPIENTS
};
