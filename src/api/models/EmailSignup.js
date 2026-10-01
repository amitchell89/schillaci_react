var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = Schema({
  email: { type: String },
  // Gmail ignores dots and +suffixes, so a bot can mint endless variants of one
  // address. The normalised form is what deduplication actually compares.
  normalizedEmail: { type: String, index: true },
  createdAt : { type : Date, default: Date.now },
  updatedAt : { type : Date, default: Date.now },
  isSubscribed: { type: Boolean, default: true },
  // Stored but not notified about. Never deleted automatically - see src/api/spamFilter.js
  spam: { type: Boolean, default: false }
});

module.exports = mongoose.model('user_email', emailSchema);
