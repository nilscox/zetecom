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

  if [ -z "$PUBLIC_DIR" -o "$ENVIRONMENT" != "staging" -a "$ENVIRONMENT" != "production" ]; then
    err "usage $0 [directory] [staging|production]"
  fi

  if [ "$ENVIRONMENT" = "production" ]; then
    DEPLOY_USER="cdv"
    API_URL="$PRODUCTION_URL"
    BASE_URL="$PRODUCTION_URL"
  else
    DEPLOY_USER="cdv-staging"
    API_URL="$STAGING_URL"
    BASE_URL="$STAGING_URL"
  fi

  ENV_PATH="$PUBLIC_DIR/assets/js/env.js"
  BUNDLE_PATH="$PUBLIC_DIR/assets/js/bundle.js"

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

  echo scp -r "$PUBLIC_DIR" "$DEPLOY_USER@$DEPLOY_HOSTNAME:public"
  scp -r "$PUBLIC_DIR" "$DEPLOY_USER@$DEPLOY_HOSTNAME:public" > /dev/null

  echo "* deployment success!"
  echo
}

PUBLIC_DIR="$1"
ENVIRONMENT="$2"

initialize_env
inject_env "NODE_ENV" "API_URL" "BASE_URL" "CHROME_EXTENSION_ID"
deploy

echo "$BASE_URL"
