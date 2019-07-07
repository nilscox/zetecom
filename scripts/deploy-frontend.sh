#!/usr/bin/env bash

err() {
  echo "ERROR: $@" >&2
  exit 1
}

DEPLOY_DESTINATION="$1"
PUBLIC_DIR="$2"

if [ -z "$DEPLOY_DESTINATION" -o -z "$PUBLIC_DIR" ]; then
  err "usage $0 user@hostname directory"
fi

BUNDLE_PATH="$PUBLIC_DIR/assets/js/bundle.js"

if [ ! -f "$BUNDLE_PATH" ]; then
  err "file \`$BUNDLE_PATH\` does not exist"
fi

echo ssh "$DEPLOY_DESTINATION" 'rm -rf ~/public'
ssh "$DEPLOY_DESTINATION" 'rm -rf ~/public'

echo scp -r "$PUBLIC_DIR" "$DEPLOY_DESTINATION:public"
scp -r "$PUBLIC_DIR" "$DEPLOY_DESTINATION:public"

echo "$BASE_URL"
