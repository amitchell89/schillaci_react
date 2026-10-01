///////////////////
// Spam filtering //
//////////////////

// A bot has been submitting both forms since late September 2026, roughly once
// a day. It is paced at one visit every five to ten hours, which is slow enough
// that rate limiting never trips, and it hits the signup and contact forms in
// the same second with a fresh address each time.
//
// Every submission carries the same two tells:
//
//   1. a throwaway Gmail address with dots scattered through the local part
//      (Gmail ignores dots, so they all reach one inbox - it is done to defeat
//      naive deduplication)
//   2. a message body that is a single run of random mixed case characters,
//      e.g. oZfWVbvZFENvrNPj
//
// BOTH tells are required before a notification is suppressed. Either alone
// would catch more, but a real customer writing a short one word message from
// firstname.lastname@gmail.com must never be swallowed. Suspected spam is still
// stored, flagged, and logged - nothing is ever silently discarded.

var GMAIL_DOMAINS = ['gmail.com', 'googlemail.com'];
var SUSPICIOUS_DOT_COUNT = 3;
var GIBBERISH_MIN_LENGTH = 12;

// The order form builds this prefix client side; the plain contact form does not
var MESSAGE_MARKERS = ["Customer's message:", "Customer&#39;s message:"];

/**
 * Gmail ignores dots and anything after a plus, so every permutation of an
 * address reaches the same inbox. Normalising lets us dedupe them.
 *
 * @param {String} email
 * @returns {String} lowercased, with gmail dots and +suffix removed
 */
function normalizeEmail(email) {
  var raw = String(email || '').toLowerCase().trim();
  var at = raw.lastIndexOf('@');

  if (at < 1) {
    return raw;
  }

  var local = raw.slice(0, at);
  var domain = raw.slice(at + 1);

  if (GMAIL_DOMAINS.indexOf(domain) !== -1) {
    local = local.split('+')[0].replace(/\./g, '');
  }

  return local + '@' + domain;
}

/** Dots in a Gmail local part. Three or more is pathological for a real address. */
function gmailDotCount(email) {
  var raw = String(email || '').toLowerCase().trim();
  var at = raw.lastIndexOf('@');

  if (at < 1 || GMAIL_DOMAINS.indexOf(raw.slice(at + 1)) === -1) {
    return 0;
  }

  return raw.slice(0, at).split('.').length - 1;
}

/**
 * Pulls out just what the visitor actually typed, discarding the project
 * answers the order form prepends. If the marker is ever missing we fall back
 * to the whole string, which contains spaces and so will not be judged
 * gibberish - i.e. this fails open.
 */
function visitorMessage(message) {
  var text = String(message || '');

  for (var i = 0; i < MESSAGE_MARKERS.length; i++) {
    var at = text.lastIndexOf(MESSAGE_MARKERS[i]);
    if (at !== -1) {
      return text.slice(at + MESSAGE_MARKERS[i].length).trim();
    }
  }

  return text.trim();
}

/** A single whitespace-free run of characters, long enough not to be a real word. */
function isGibberish(message) {
  var text = visitorMessage(message);
  return text.length >= GIBBERISH_MIN_LENGTH && !/\s/.test(text);
}

/**
 * Judges a submission.
 *
 * Pass `message` for the contact form, omit it for a signup - a signup has no
 * message to weigh, so the address is all there is to go on.
 *
 * @param {Object} fields { email, message }
 * @returns {Object} { spam: Boolean, reason: String|null }
 */
function inspect(fields) {
  var dots = gmailDotCount(fields.email);
  var dotted = dots >= SUSPICIOUS_DOT_COUNT;

  if (typeof fields.message === 'undefined') {
    return dotted
      ? { spam: true, reason: dots + ' dots in the gmail local part' }
      : { spam: false, reason: null };
  }

  if (dotted && isGibberish(fields.message)) {
    return {
      spam: true,
      reason: dots + ' dots in the gmail local part and a single-token message'
    };
  }

  return { spam: false, reason: null };
}

module.exports = {
  normalizeEmail: normalizeEmail,
  gmailDotCount: gmailDotCount,
  visitorMessage: visitorMessage,
  inspect: inspect
};
