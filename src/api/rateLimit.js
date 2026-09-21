///////////////////
// Rate limiting //
///////////////////

// Deliberately dependency free and in memory. This is one small site on one
// process, so a package plus a shared store would be more moving parts than the
// problem deserves - and it keeps the droplet deploy to a git pull with no
// npm install. Counters reset on restart, which is fine for abuse control.

/**
 * Caddy appends the real peer address to X-Forwarded-For, so the LAST entry is
 * the one a client cannot spoof by sending their own header. Falls back to the
 * socket address when the app is reached directly.
 */
function clientIp(req) {
  var forwarded = req.headers['x-forwarded-for'];

  if (forwarded) {
    var parts = String(forwarded).split(',');
    var last = parts[parts.length - 1].trim();
    if (last) {
      return last;
    }
  }

  return (req.connection && req.connection.remoteAddress) || 'unknown';
}

/**
 * Fixed window counter.
 *
 * @param {Number} windowMs length of the window
 * @param {Number} max requests allowed per key per window
 * @returns {Function} call with a key, returns { limited, retryAfterSeconds }
 */
function createCounter(windowMs, max) {
  var hits = {};
  var lastSweep = Date.now();

  function sweep(now) {
    Object.keys(hits).forEach(function(key) {
      if (now >= hits[key].resetAt) {
        delete hits[key];
      }
    });
  }

  return function count(key) {
    var now = Date.now();

    // Keep the map from growing without bound
    if (now - lastSweep > windowMs) {
      sweep(now);
      lastSweep = now;
    }

    var entry = hits[key];

    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
      hits[key] = entry;
    }

    entry.count += 1;

    return {
      limited: entry.count > max,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000)
    };
  };
}

//////////////////////////
// Contact form limiter //
//////////////////////////

// A real enquiry is sent once. Five in a quarter of an hour is already generous.
var PER_IP_WINDOW_MS = 15 * 60 * 1000;
var PER_IP_MAX = 5;

// Backstop protecting the Gmail account itself, regardless of source address.
// Tripping this on a site this size means abuse, not a busy day.
var GLOBAL_WINDOW_MS = 60 * 60 * 1000;
var GLOBAL_MAX = 30;

var perIp = createCounter(PER_IP_WINDOW_MS, PER_IP_MAX);
var global = createCounter(GLOBAL_WINDOW_MS, GLOBAL_MAX);

var TOO_MANY = "You've already sent a few messages. Please wait a little while, or email us directly at d.schillaciguitars@gmail.com.";

/**
 * Express middleware. Caps submissions per address and in total, so an open
 * unauthenticated endpoint cannot flood the inbox or get the sending account
 * rate limited by Google.
 */
function contactFormLimiter(req, res, next) {
  var ip = clientIp(req);
  var byIp = perIp(ip);

  if (byIp.limited) {
    console.warn('[rateLimit] blocked /contact from ' + ip + ' (per address limit)');
    res.set('Retry-After', String(byIp.retryAfterSeconds));
    return res.status(429).json({ message: TOO_MANY });
  }

  var overall = global('all');

  if (overall.limited) {
    console.warn('[rateLimit] blocked /contact - global cap of ' + GLOBAL_MAX + '/hour reached, latest from ' + ip);
    res.set('Retry-After', String(overall.retryAfterSeconds));
    return res.status(429).json({ message: TOO_MANY });
  }

  return next();
}

module.exports = {
  contactFormLimiter: contactFormLimiter,
  clientIp: clientIp,
  createCounter: createCounter
};
