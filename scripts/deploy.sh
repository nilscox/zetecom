#!/usr/bin/env sh

ENVIRONMENT="$1"
DEPLOY_USER="cdv"
BUILD_DIR="."

if [ "$ENVIRONMENT" != "staging" -a "$ENVIRONMENT" != "production" ]; then
  echo "usage $0 [staging|production]" >&2
  exit 1
fi

if [ -n "$TRAVIS_BUILD_DIR" ]; then
  BUILD_DIR="$TRAVIS_BUILD_DIR"
fi

if [ -z "$DEPLOY_HOSTNAME" ]; then
  echo "missing DEPLOY_HOSTNAME environment variable" >&2
  exit 1
fi

if [ "$ENVIRONMENT" = "staging" ]; then
  DEPLOY_USER="cdv-staging"
fi

echo "deploying in $ENVIRONMENT environment..."

ssh "$DEPLOY_USER@$DEPLOY_HOSTNAME" 'rm -rf ~/public'
scp -r "$BUILD_DIR/frontend/public" "$DEPLOY_USER@$DEPLOY_HOSTNAME:public"
