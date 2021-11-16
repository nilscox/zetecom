#!/usr/bin/env sh

if [ ! -d "$1" ]; then
  echo "usage: replace-env.sh <dist-path>" >&2
  exit 1
fi

sed -i "s|__BASENAME__|$BASENAME|g" "$1"/*.js
sed -i "s|__API_URL__|$API_URL|g" "$1"/*.js
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" "$1"/*.js
sed -i "s|__ANALYTICS_URL__|$ANALYTICS_URL|g" "$1"/*.js
sed -i "s|__ANALYTICS_SITE_ID__|$ANALYTICS_SITE_ID|g" "$1"/*.js
