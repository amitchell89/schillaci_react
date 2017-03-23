var express = require('express')
var app = express()
var path    = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var helmet = require('helmet')
var xss = require('xss');

// MongoDb
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/schillaci');

// Make db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

// Helmet setup
app.use(helmet())
app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +'/index.html'));
})

app.listen(3000, function () {
  console.log('Site listening on port 3000!')
})

// handle contact page posts
app.post('/contact', function(req, res) {
  var payload = req.body;
  console.log('post on contact')
  console.log('check', payload)
  var name = xss(payload.name);
  var email = xss(payload.email);
  var message = xss(payload.message);
  var email_message = '<b>From:</b> ' + name + '<br /><br /><b>Email:</b> ' + email + '<br /><br /><b>Message:</b> ' + message;
  var subject = 'Schillaci Guitars: New Message';
  sendMail(subject, email_message, res);
});

// handle email submission posts
app.post('/email', function(req, res) {
  var payload = req.body;
  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('emails');
  // Submit to the DB
   collection.insert(payload, function (err, doc) {
       if (err) {
         // If it failed, return error
         res.send("There was a problem adding the information to the database.");
       }
       else {
          var subject = 'Schillaci Guitars: New Email Signup';
          var message = '<b>New Email Signup:</b> ' + payload.email;
          sendMail(subject, message, res);
       }
   });
});

// Send Emails
function sendMail(subject, message, res) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Schillaci Guitars" <' + user + '>', // sender address
    to: 'aaronmitchellart@gmail.com', // list of receivers
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
  });
  transporter.close();
}




