# Schillaci Guitars

## Built with
- Node
- Express
- React
- React Router
- Webpack
- Babel

Project based on [React_Starter](https://github.com/amitchell89/react_starter)

## Setup
`npm install`

`npm run webpack` : Starts Webpack

`npm run server`: Starts express server

`start-mongo`: Start MongoDb

Visit localhost:3003

> Start the server from the project root. `dotenv` reads `.env` from the current
> working directory, so running it from anywhere else silently leaves every
> environment variable unset.

## Environment

The server reads these from `.env` in the project root (gitignored — the real
one lives on the droplet):

| Variable | Notes |
|---|---|
| `EMAIL_USER` | The Gmail address notifications are sent from |
| `EMAIL_PASSWORD` | **A 16 character Gmail App Password, not the account password** |
| `EMAIL_SERVICE` | `Gmail` |

> `RECAPTCHA_SECRET` is no longer used. Google retired this site's classic
> reCAPTCHA key in September 2026, so the signup form is protected by rate
> limiting instead — see `src/api/rateLimit.js`.


### About that app password

Google stopped accepting plain account passwords over SMTP in May 2022. The only
thing that works is an App Password from
[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords),
which requires 2-Step Verification on the account.

**Changing your Google account password revokes it.** When that happens the
contact form stops delivering. Generate a fresh App Password, put it in `.env`
with the spaces stripped, and restart the server.

## Building for production

```bash
npm run build      # or: sbuild
```

This compiles the bundle into `src/dist/`, which **is committed** — the droplet
deploys by pulling, not by building.

You cannot build this with your default Node. `node-sass@4.14.1` predates Apple
Silicon and has no arm64 binary. On the wrong Node the SCSS fails to compile,
**webpack still exits 0 and still writes a bundle**, and that bundle is missing
every stylesheet — it looks fine until it is deployed.

`npm run build` therefore runs `scripts/build.sh`, which:

1. Pins the Node version from `.nvmrc` (12.22.12, x64) via nvm
2. Treats `ERROR in` in webpack's output as a real failure
3. Verifies compiled CSS is actually present in the bundle
4. Verifies `bundle.js.gz` matches `bundle.js` byte for byte
5. Restores the previous bundle if any of that fails

Do not bypass it by calling `webpack` directly — that is the footgun it exists
to cover. If `nvm install 12.22.12` is missing on a new machine, install it
first; it must be the x64 build.

There is a shell alias for it in `~/.zshrc`:

```bash
alias sbuild='(cd ~/src/schillaci_react && npm run build)'
```

## Deploying

```bash
cd ~/apps/schillaci_react
git pull
forever restart <id>       # forever list, to find the id
```

No `npm install` is needed for a normal deploy. Submit a real message through
the contact form afterwards to confirm mail is still flowing.

### If the contact form stops working

Check the App Password first — it is the most likely cause by a wide margin.
Then read the process log, where the real SMTP error is printed:

```bash
forever list
tail -n 100 ~/.forever/*.log
```

Enquiries are stored in MongoDB before delivery is attempted, so a mail outage
cannot lose one. Anything that failed to send is still recoverable:

```js
db.contact_messages.find({ emailed: false })
```

## Slider

The Slider is built using [slick-carousel](https://www.npmjs.com/package/slick-carousel) and [react-slick](https://github.com/akiran/react-slick)

## Parallax

Parallax effect built using [react-parallax](https://www.npmjs.com/package/react-parallax)


## MongoDB Setup

This project requires MongoDB to run locally. Follow the steps below to get it up and running.

1. Install MongoDB

macOS (using Homebrew):

`brew tap mongodb/brew
brew install mongodb-community@7.0`

Make sure mongod and mongo commands are available in your terminal.

2. Create a Data Directory

MongoDB needs a directory to store its database files. For this project, we’ll use a directory in your home folder:

`mkdir -p ~/mongodb/data`

3. Add an Alias to Start MongoDB Easily

Add the following alias to your ~/.zshrc (or ~/.bashrc if using Bash):

`alias start-mongo='mongod --dbpath ~/mongodb/data'`

Then reload your shell configuration:

`source ~/.zshrc`

4. Start MongoDB

Now you can start MongoDB with a single command:

`start-mongo`

This will launch MongoDB using the data directory at ~/mongodb/data.

## Collections

| Collection | Written by | Notes |
|---|---|---|
| `contact_messages` | `POST /contact` | Every enquiry, with `emailed` / `emailError` delivery status |
| `user_emails` | `POST /api/addEmail` | Mailing list signups |

## Known issues and deferred work

See [docs/claude-review.md](docs/claude-review.md) for a record of everything
found during the September 2026 review that was deliberately left alone, and why.
