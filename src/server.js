var express = require('express')
var app = express()
var path    = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var helmet = require('helmet')
var xss = require('xss');

// Helmet setup
app.use(helmet())
app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +'/index.html'));
})

app.listen(3000, function () {
  console.log('Site listening on port 3000!')
})

// handle contact page posts
app.post('/contact', function(req, res) {
  var payload = req.body;
  var name = xss(payload.name)
  var email = xss(payload.email)
  var message = xss(payload.message)

  var email_message = '<b>From:</b> ' + name + '<br /><br /><b>Email:</b> ' + email + '<br /><br /><b>Message:</b> ' + message;

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Site Name Here" <' + user + '>', // sender address
    to: 'aaronmitchellart@gmail.com', // list of receivers
    subject: 'New Message From Your Website', // Subject line
    text: email_message, // plaintext body
    html: email_message // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        res.redirect('/post?post=fail')
        return console.log(error);
    }
    res.redirect('/post?post=success')
  });
  transporter.close();
});

// handle email submission posts
app.post('/email', function(req, res) {
  var payload = req.body;
  console.log('test', payload)
});

