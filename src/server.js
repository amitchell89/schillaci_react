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


