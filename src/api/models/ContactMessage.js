var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Contact enquiries are stored before delivery is attempted, so a mail outage
// can never lose one. Anything with emailed:false still needs following up.
var contactMessageSchema = Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  emailed: { type: Boolean, default: false },
  emailError: { type: String, default: null }
});

module.exports = mongoose.model('contact_message', contactMessageSchema);
