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

/**
 * Builds an Express middleware that caps requests per address and in total.
 * The global cap is the one protecting the Gmail account, since both of these
 * endpoints send mail.
 */
function createLimiter(options) {
  var perIp = createCounter(options.perIpWindowMs, options.perIpMax);
  var overall = createCounter(options.globalWindowMs, options.globalMax);

  return function limiter(req, res, next) {
    var ip = clientIp(req);
    var byIp = perIp(ip);

    if (byIp.limited) {
      console.warn('[rateLimit] blocked ' + options.label + ' from ' + ip + ' (per address limit)');
      res.set('Retry-After', String(byIp.retryAfterSeconds));
      return res.status(429).json({ message: options.message });
    }

    var byAll = overall('all');

    if (byAll.limited) {
      console.warn('[rateLimit] blocked ' + options.label + ' - global cap of ' +
                   options.globalMax + '/hour reached, latest from ' + ip);
      res.set('Retry-After', String(byAll.retryAfterSeconds));
      return res.status(429).json({ message: options.message });
    }

    return next();
  };
}

//////////////
// Limiters //
//////////////

// A real enquiry is sent once. Five in a quarter of an hour is already generous.
var contactFormLimiter = createLimiter({
  label: '/contact',
  perIpWindowMs: 15 * 60 * 1000,
  perIpMax: 5,
  globalWindowMs: 60 * 60 * 1000,
  globalMax: 30,
  message: "You've already sent a few messages. Please wait a little while, or email us directly at d.schillaciguitars@gmail.com."
});

// The signup form has no captcha, so this is its only bot protection. It gets a
// separate budget from the contact form on purpose: a flood of signups must not
// be able to use up the allowance that real enquiries depend on.
var signupLimiter = createLimiter({
  label: '/api/addEmail',
  perIpWindowMs: 15 * 60 * 1000,
  perIpMax: 3,
  globalWindowMs: 60 * 60 * 1000,
  globalMax: 15,
  message: "That's a few signups from here already. Please try again a little later."
});

module.exports = {
  contactFormLimiter: contactFormLimiter,
  signupLimiter: signupLimiter,
  clientIp: clientIp,
  createCounter: createCounter,
  createLimiter: createLimiter
};
