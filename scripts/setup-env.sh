#!/bin/sh

err() {
  echo "ERROR: $@" >&2
  exit 1
}

getenv() {
  eval "echo \"\$$1\""
}

ensure_env() {
  for var in "$@"; do
    if [ -z $(getenv "$var") ]; then
      err "missing $var environment variable"
    fi
  done
}

ensure_env "CI" "TRAVIS"
ensure_env "PRODUCTION_URL" "STAGING_URL"

if [ "$TRAVIS_BRANCH" = "master" ]; then
  export API_URL="$PRODUCTION_URL"
  export BASE_URL="$PRODUCTION_URL"
else
  export API_URL="$STAGING_URL"
  export BASE_URL="$STAGING_URL"
fi
