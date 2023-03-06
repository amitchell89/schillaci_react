///////////////////
// Requirements //
/////////////////

var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var emailSignup = require('../models/EmailSignup');

var validator = require("email-validator");

/////////////////
// API - User //
///////////////


// API - ADD EMAIL 

router.post('/api/addEmail', function(req, res) {
  var payload = req.body;
  
  // Validate Email
  // var email = xss(payload)
  var validatedEmail = validator.validate(payload.email);

  if (validatedEmail) {

    var newEmail = new emailSignup({ 
      email: payload.email
    });

    newEmail.save(function (err, newEmail) {
      if (err) {
        console.log('err', err)
        return res.status(500).json({message: 'Signup Failure: Server Error'});
      } else {
        return res.json({
          newEmail
        })
      }
    });
  } else {
    return res.status(401).json({message: 'Please enter a valid email'});
  }
});


module.exports = router;