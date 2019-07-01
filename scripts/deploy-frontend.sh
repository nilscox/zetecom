#!/usr/bin/env bash

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

initialize_env() {
  echo "* initilizing environment"

  ensure_env "DEPLOY_HOSTNAME"
  ensure_env "PRODUCTION_URL" "STAGING_URL"

  if [ "$ENVIRONMENT" != "staging" -a "$ENVIRONMENT" != "production" ]; then
    err "usage $0 [staging|production]"
  fi

  if [ -n "$TRAVIS_BUILD_DIR" ]; then
    BUILD_DIR="$TRAVIS_BUILD_DIR"
  fi

  if [ "$ENVIRONMENT" = "staging" ]; then
    DEPLOY_USER="cdv-staging"
    API_URL="$STAGING_URL"
    BASE_URL="$STAGING_URL"
  fi

  ENV_PATH="$BUILD_DIR/frontend/public/assets/js/env.js"
  BUNDLE_PATH="$BUILD_DIR/frontend/public/assets/js/bundle.js"

  if [ ! -f "$BUNDLE_PATH" ]; then
    err "file \`$BUNDLE_PATH\` does not exist"
  fi

  echo
}

inject_env() {
  echo "* injecting environment variables"

  rm -f "$ENV_PATH"
  echo "window.env = {" >> "$ENV_PATH"

  for var in "$@"; do
    value=$(getenv "$var")
    value=$(echo $value | sed "s/'/\\\\'/g")

    ensure_env "$var"

    echo "- $var='$value'"
    echo "  $var: '$value'," >> "$ENV_PATH"
  done

  echo "};" >> "$ENV_PATH"
  echo
}

deploy() {
  echo "* deploying in $ENVIRONMENT environment"

  echo ssh "$DEPLOY_USER@$DEPLOY_HOSTNAME" 'rm -rf ~/public'
  ssh "$DEPLOY_USER@$DEPLOY_HOSTNAME" 'rm -rf ~/public'

  echo scp -r "$BUILD_DIR/frontend/public" "$DEPLOY_USER@$DEPLOY_HOSTNAME:public"
  scp -r "$BUILD_DIR/frontend/public" "$DEPLOY_USER@$DEPLOY_HOSTNAME:public" > /dev/null

  echo "* deployment success!"
  echo
}

ENVIRONMENT="$1"
DEPLOY_USER="cdv"
BUILD_DIR="."

initialize_env
inject_env "NODE_ENV" "API_URL" "BASE_URL" "CHROME_EXTENSION_ID"
deploy

echo "$BASE_URL"
