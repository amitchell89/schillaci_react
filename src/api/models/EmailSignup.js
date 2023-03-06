var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = Schema({
  email: { type: String },
  createdAt : { type : Date, default: Date.now },
  updatedAt : { type : Date, default: Date.now },
  isSubscribed: { type: Boolean, default: true }
});

module.exports = mongoose.model('user_email', emailSchema);



