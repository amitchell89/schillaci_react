#!/usr/bin/env bash
set -euo pipefail

# Builds the production bundle.
#
# node-sass 4.14.1 ships precompiled binaries, has none for arm64, and was
# released before Apple Silicon existed. On the wrong Node the SCSS fails to
# compile - but webpack 1 exits 0 anyway and STILL WRITES A BUNDLE. That bundle
# is missing every stylesheet and looks fine until it is deployed.
#
# So this script does three things the raw webpack call does not: it pins the
# Node version from .nvmrc, it treats "ERROR in" in webpack's output as a real
# failure, and it refuses to leave behind a bundle with no CSS in it.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DIST="$ROOT/src/dist"
WORK="$(mktemp -d)"
LOG="$WORK/webpack.log"

# Strings that can only appear once SCSS has actually compiled. Do not use
# class names here - slick-carousel puts those in its JavaScript too, so they
# survive a failed CSS build and make the check useless.
CSS_MARKERS=('@media' 'font-family:')

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "error: nvm not found at $NVM_DIR" >&2
  echo "       this build needs the Node version pinned in .nvmrc" >&2
  exit 1
fi

# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"

REQUIRED="$(tr -d '[:space:]' < "$ROOT/.nvmrc")"

if ! nvm exec --silent "$REQUIRED" node -v >/dev/null 2>&1; then
  echo "error: Node $REQUIRED is not installed" >&2
  echo "       run: nvm install $REQUIRED" >&2
  exit 1
fi

ARCH="$(nvm exec --silent "$REQUIRED" node -p 'process.arch')"
echo "==> building with Node $REQUIRED ($ARCH)"

# Keep the working bundle so a failed build cannot leave a broken one in place
cp "$DIST/bundle.js" "$WORK/" 2>/dev/null || true
cp "$DIST/bundle.js.gz" "$WORK/" 2>/dev/null || true

fail() {
  echo "==> restoring the previous bundle" >&2
  cp "$WORK/bundle.js" "$DIST/bundle.js" 2>/dev/null || true
  cp "$WORK/bundle.js.gz" "$DIST/bundle.js.gz" 2>/dev/null || true
  echo "error: $1" >&2
  [ "${2:-}" = "" ] || echo "       $2" >&2
  rm -rf "$WORK"
  exit 1
}

set +e
nvm exec --silent "$REQUIRED" ./node_modules/.bin/webpack -p 2>&1 | tee "$LOG"
WEBPACK_STATUS=${PIPESTATUS[0]}
set -e

[ "$WEBPACK_STATUS" -eq 0 ] || fail "webpack exited with status $WEBPACK_STATUS"

# webpack 1 reports module failures here but still exits 0, so this is the check
# that actually matters
if grep -q "^ERROR in" "$LOG"; then
  fail "webpack reported build errors (see the output above)" \
       "if these are node-sass errors, you are on the wrong Node - .nvmrc pins $REQUIRED"
fi

for marker in "${CSS_MARKERS[@]}"; do
  grep -qF -- "$marker" "$DIST/bundle.js" || \
    fail "the bundle built but contains no compiled CSS (missing '$marker')" \
         "node-sass failed silently - check you are on Node $REQUIRED and that it is x64"
done

# The server and Caddy both serve the .gz, so it must match byte for byte
gunzip -c "$DIST/bundle.js.gz" | cmp -s - "$DIST/bundle.js" || \
  fail "bundle.js.gz does not match bundle.js"

rm -rf "$WORK"
echo "==> ok: $(wc -c < "$DIST/bundle.js" | tr -d ' ') bytes, styles present, gzip matches"
