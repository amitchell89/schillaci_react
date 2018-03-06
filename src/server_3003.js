///////////////////
// Requirements //
/////////////////

var express = require('express')
var app = express()
var path    = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var helmet = require('helmet')
var xss = require('xss');
var validator = require("email-validator");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

/////////////
// Router //
////////////

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +'/index.html'));
})

app.listen(3003, function () {
  console.log('Site listening on port 3003!')
})

// create reusable transporter object using the default SMTP transport
// NodeMailer 0.7
var password = process.env.PASSWORD || null
var user = process.env.USER || null
var service = process.env.SERVICE || null

var transporter = nodemailer.createTransport("SMTP", {
  service: service,
  auth: {
    user: user,
    pass: password
  }
});

//////////////
// Contact //
////////////

app.post('/contact', function(req, res) {
  var payload = req.body;
  var name = xss(payload.name);
  var email = xss(payload.email);
  var message = xss(payload.message);
  var email_message = '<b>From:</b> ' + name + '<br /><br /><b>Email:</b> ' + email + '<br /><br /><b>Message:</b> ' + message;
  var subject = 'Schillaci Guitars: New Message';
  sendMail(subject, email_message, res);
});

///////////////////
// Email Signup //
/////////////////

var userEmail = require('./api/models/UserEmail');

app.post('/api/addEmail', function(req, res) {
  var payload = req.body;

  // Validate Email
  // var email = xss(payload)
  var result = validator.validate(payload.email);
  if (result) {
    var newEmail = new userEmail({ 
      email: payload.email
    });

    newEmail.save(function (err, newEmail) {
      if (err) {
        console.log('err', err)
        return res.status(500).json({message: 'Signup Failure: Server Error'});
      } else {
        console.log('success', newEmail)
        var subject = 'Schillaci Guitars: New Email Signup';
        var message = '<b>New Email Signup:</b> ' + payload.email;
        sendMail(subject, message, res);
        return res.json({
          newEmail
        })
      }
    });
  } else {
    return res.status(401).json({message: 'Please enter a valid email'});
  }
});

// Send Emails
function sendMail(subject, message, res) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Schillaci Guitars" <' + user + '>', // sender address
    to: 'aaronmitchellart@gmail.com, d.schillaciguitars@gmail.com', // list of receivers
    subject: subject, // Subject line
    text: message, // plaintext body
    html: message // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        res.end();
        return console.log(error);
    }
    res.end();
    return console.log('mail sent successfully');
  });
  transporter.close();
}




