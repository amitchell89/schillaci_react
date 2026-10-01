# CLAUDE.md

Notes for working on this site. Written after the September 2026 session that
fixed nine months of silently failing contact forms.

## How Aaron wants to work on this

**Server-side and database work is not his strong suit — write it out in full.**
Don't describe what to change, or hand over a fragment to adapt. Give complete
files and complete copy-paste commands. He runs things on the droplet and pastes
the output back, so commands should print clearly labelled, readable output.

**Front-end, React and CSS he knows well.** No need to over-explain there.

**Always give a read-only command before a destructive one.** The pattern that
works: command 1 is a dry run that prints what *would* change, command 2 does
it. Say explicitly "run 1 and look at it before running 2", and state what the
expected output is so a surprise is obvious.

**Ask before acting on anything beyond the stated request**, with the tradeoff
spelled out and a recommendation. He'll say yes to good proposals, but he wants
to see the choice. He will also push back on scope, and that pushback is
well-judged — take it.

**Explain the why, not just the fix.** He asks good follow-up questions ("what's
the scam? what's the risk?") and wants the reasoning, including an honest
assessment of how worried to be. Say when something is low risk.

**Commits: no Claude attribution.** No `Co-Authored-By`, no "Generated with".
Work goes straight to `master`, which is the deploy branch.

## Hard constraints — read before writing any server code

**The droplet runs Node v10.22.0.** All server-side code must be ES5. No
`const`/`let`, no arrow functions, no optional chaining, no `Object.fromEntries`.
Match the existing `var` / `function` style. Getting this wrong takes the site
down on restart.

**Don't touch shared infrastructure.** The droplet hosts Aaron's other sites.
MongoDB 3.6.3, forever, and Node 10 are all off limits — upgrading any of them
is a multi-site project he has explicitly deferred. Note it, don't fix it.

**Avoid new dependencies.** He doesn't want to debug `npm install` on the
droplet. A server-only change with no new deps deploys as a plain `git pull`.
This is why the rate limiter in `src/api/rateLimit.js` is hand-rolled rather
than `express-rate-limit`.

**Prefer moves to removals in package.json.** Reversible beats tidy.

## MongoDB

**The droplet has the legacy `mongo` shell, version 3.6.3. There is no
`mongosh`.** That means:

- `.count()`, not `.countDocuments()`
- use `function(d){...}`, not arrow functions, in `--eval`
- `ISODate("...")`, `printjson`, `tojson`, `updateOne`, `deleteMany` all work

**Format every query as a self-contained one-liner**, so he never has to enter
or exit the shell:

```bash
mongo schillaci --quiet --eval '
print("signups: " + db.user_emails.count());
db.user_emails.find().sort({createdAt: 1}).forEach(function(d){
  print(d.createdAt.toISOString().slice(0, 16) + "  " + d.email);
});
'
```

Guard against documents missing a field — older rows predate parts of the
schema, so `if (!d.createdAt) { return; }` before using it.

Database is `schillaci`. Collections:

| Collection | Written by | Notes |
|---|---|---|
| `contact_messages` | `POST /contact` | `emailed`, `emailError`, `spam` |
| `user_emails` | `POST /api/addEmail` | `normalizedEmail`, `spam` |

## Build and deploy

**Never run `webpack` directly.** `node-sass@4.14.1` has no arm64 binary, and on
the wrong Node the SCSS fails while webpack still exits 0 and writes a bundle
with no styles in it. Use:

```bash
npm run build      # or the sbuild alias in ~/.zshrc
```

That runs `scripts/build.sh`, which pins Node 12.22.12 x64 from `.nvmrc`, treats
`ERROR in` as a failure, checks compiled CSS is present, and restores the
previous bundle if anything fails.

**Work out whether a rebuild is needed and say so**, because it changes the
deploy:

- server-only change → no rebuild, deploy is `git pull` + restart
- anything under `src/components`, `src/views`, `src/store`, `src/css` → rebuild
  and commit `src/dist/` (the bundle is committed; the droplet never builds)

```bash
cd ~/apps/schillaci_react && git pull && forever restart <id>
```

`forever list` gives the id. To find this site's log among the others:

```bash
grep -l "port 3003" ~/.forever/*.log
```

## Conventions in this codebase

**Never let a failure be silent.** Every bug found in this project was a silent
one: a contact form returning 200 while mail failed, a route shadowed so its
handler never ran, reCAPTCHA errors discarded before anyone could read them.
Surface it to the user, or store it, or log it with a reason — never drop it.

**Store before you send.** Form submissions are written to Mongo before mail is
attempted, so an outage can't lose one. Keep that property.

**Fail open on our own faults.** If a check can't run because of a
misconfiguration on our side, let the submission through and log loudly. Don't
block a real customer over our broken config — `src/api/routes/addEmail.js` has
the worked example.

**Test the failure path, not just the happy one.** Both times a safety net was
written this session it was wrong on the first attempt and only testing the
broken case revealed it. `npm test` runs `src/api/spamFilter.test.js`.

**Mail:** `EMAIL_PASSWORD` must be a 16-character Gmail App Password. Rotating
the Google account password revokes it and silently breaks every form. This is
the first thing to check if mail stops.

## Where things are already written down

- `README.md` — env vars, the app password trap, build and deploy steps
- `docs/claude-review.md` — everything found and deliberately *not* changed, with
  reasoning: dead Universal Analytics, the EOL Node and Mongo, the form spam
  bot's fingerprint, dependency notes, and the known limits of what exists
- `src/api/spamFilter.test.js` — the spam fingerprint, as executable assertions

Check `docs/claude-review.md` before proposing work. It probably already says
why something is the way it is.
