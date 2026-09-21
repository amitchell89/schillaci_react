# Site review — 21 September 2026

A record of everything found during the contact-form outage investigation that
we deliberately **did not** change, so it doesn't have to be rediscovered.

Context: the contact form had been silently failing since roughly December 2025.
Root cause was a revoked Gmail App Password, hidden by a server that returned
HTTP 200 whether or not the mail actually sent.

---

## Operational facts worth not relearning

**Gmail needs an App Password, not the account password.** Google stopped
accepting account passwords over SMTP on 30 May 2022. `EMAIL_PASSWORD` on the
droplet must be a 16 character App Password from
`myaccount.google.com/apppasswords`. **Changing the Google account password
revokes it**, which silently breaks every form on the site. That is exactly what
happened in December 2025.

**The bundle can only be built on Node 12 (x64).** `node-sass@4.14.1` has no
arm64 binary. On the wrong Node, the SCSS fails, webpack 1 still exits 0, and a
styleless bundle gets written. `npm run build` now pins the version and refuses
to leave a CSS-less bundle behind — do not bypass it by calling webpack directly.

**dotenv reads `.env` from the process working directory**, not from the script's
directory. The app must be started from the project root or every environment
variable silently becomes `null`.

---

## Droplet environment

Confirmed 21 Sep 2026:

| | |
|---|---|
| Node | **v10.22.0** |
| MongoDB | 3.6.3, listening on `127.0.0.1:27017` only — not exposed |
| App path | `~/apps/schillaci_react` |
| Process manager | forever |

MongoDB being on loopback is the reassuring half. Node 10 is the other half:
it reached end of life in **April 2021**, so the runtime serving the site has
had no security patches in five years.

This is also the real constraint on every future dependency decision. Anything
upgraded from here has to stay Node 10 compatible, or Node gets upgraded first.
The nodemailer upgrade noted below is a concrete example — check its engine
requirement before attempting it.

The code shipped on 21 Sep 2026 is deliberately ES5 (no arrow functions, no
`const`/`let` in server code) and was confirmed running on Node 10 in
production after a `forever restart`.

## Deferred: infrastructure (shared with other sites)

Not touched by request — the droplet hosts other projects and these are a can of
worms.

- **MongoDB 3.6.3** reached end of life in April 2021. Five years without
  security patches. Deliberately left alone.
- **forever** left in `dependencies` and untouched for the same reason, even
  though a process manager is an odd thing for an app to depend on.
- **Node 10.22.0** on the droplet, EOL since April 2021. Upgrading it is the
  single highest value infrastructure change available, and also the riskiest,
  because other sites share the box.

---

## Deferred: actually broken

### Google Analytics has been dead since 1 July 2023

`ga_tracking_code` in `src/store/constants/meta_info.js` is `UA-114677834-1`, a
Universal Analytics property. Google stopped processing UA data entirely on that
date. Every `ReactGA.pageview` and every event — including the `SubmitOrderForm`
event on the order form — has gone nowhere for three years.

Fixing it needs a GA4 property and a library change; `react-ga@2.7` predates GA4
and cannot talk to it. Either `react-ga4` or a plain gtag snippet.

Knock-on effect: `src/views/Privacy/Privacy.js` still tells visitors the site
uses Google Analytics. That statement is currently untrue.

### The contact form has no bot protection

Rate limiting was added on 21 Sep 2026 (`src/api/rateLimit.js`) — 5 submissions
per address per 15 minutes, 30 per hour overall. That caps the damage but does
not stop a determined bot.

The signup form already has reCAPTCHA and the plumbing is reusable. Putting the
same check on `/contact` is the obvious next step; it was left out to avoid a
front-end change and rebuild.

---

## Deferred: dead code and dead weight

None of this is harmful. All of it is confusing to the next person.

| Item | Finding |
|---|---|
| `monk` + `mongodb` | `req.db` is assigned on every request in `server_3003.js` and **read nowhere in the codebase**. Left in place by request — both are also used elsewhere on the droplet |
| `path` package | Node's builtin always wins the resolution; the userland shim never loads |
| `redux-devtools` | Not imported anywhere. Moved to `devDependencies`, not removed. Only `redux-devtools-extension` is actually used |
| `.babelc` | Misspelled — should be `.babelrc`. It is inert, which means the `react-hot-loader` plugin it configures has never run. Webpack specifies presets inline, so nothing breaks |
| `src/dist/bundle.js.map` | 2.1 MB, stale since December 2025, left over from a `webpack -d` build. Production builds don't emit it |
| `var Schema = mongoose.Schema` | Unused in `server_3003.js` since the models moved to their own files |
| `app.get('*.js')` gz rewrite | Never fires — `express.static('src')` is registered first and serves the plain file. Harmless: Caddy compresses on the fly (measured: 469 kB declared, 122 kB transferred) |

---

## Deferred: dependency modernisation

### What the vulnerability count actually means

GitHub reports ~162 vulnerabilities. Most are build-chain transitives that never
run on the server. Because `package.json` uses caret ranges, the **installed**
runtime versions are far newer than the declared minimums:

```
express 4.22.1   body-parser 1.20.4   mongoose 5.13.23
react 16.14.0    axios 1.13.2         helmet 3.23.3
```

Those are all current-for-their-major. On 21 Sep 2026 the build tooling was moved
from `dependencies` to `devDependencies`, which cuts the production audit surface
considerably without changing runtime behaviour.

### The genuinely old things

- **`nodemailer@0.7.1`** (2014). Verified working on Node 22 — it negotiates TLS
  with Gmail and authenticates fine. Its problem is that it depends on
  **`aws-sdk@2.0.5`** for an SES transport the site does not use, which is a
  large share of install size and audit noise. Upgrading to nodemailer 6 or 7 is
  a contained change to `src/api/mailer.js` and would drop that entire tree.
- **webpack 1.15 + node-sass 4.14** is the root of the build fragility. The real
  fix is migrating to webpack 2+ and dart-sass, because `sass-loader@4` does a
  literal `require('node-sass')`. That is a day of work on a site touched twice a
  year, which is why the pinned-Node workaround was chosen instead.
- **`react-router@3`**, **string refs** (`this.refs.name`), and
  **`react-recaptcha@2.3.10`** are all dated but working. `react-recaptcha` is
  unmaintained and would break if Google ever retires the v2 render API.

---

## Known limits of what was built on 21 Sep 2026

Honest caveats on the new code, so nobody assumes more than it does:

- **The rate limiter is in-memory and per-process.** Counters reset on restart
  and are not shared. Correct for one process on one droplet; if the app is ever
  run multi-process or behind more than one node, it needs a shared store.
- **It trusts the last entry of `X-Forwarded-For`.** Correct behind Caddy, which
  appends the real peer address. If the proxy setup changes, revisit it.
- **`contact_messages` grows without bound.** No pruning or TTL index. At this
  site's volume that is decades away, but it is not self-limiting.
- **Mail failures are recorded but nothing alerts you.** A message that fails to
  send is stored with `emailed: false`. Worth checking occasionally:
  `db.contact_messages.find({emailed: false})`
