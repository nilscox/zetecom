#!/usr/bin/env bash

root='/var/www/zc-app'

if [ "$CYPRESS" == "true" ]; then
  root='/var/www/zc-app_instrumented'
fi

sed -i "s|__ROOT_DIR__|$root|" /etc/nginx/conf.d/default.conf

sed -i "s|__API_URL__|$API_URL|g" "$root"/main.*.js
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" "$root"/main.*.js
sed -i "s|__GOOGLE_ANALYTICS_ID__|$GOOGLE_ANALYTICS_ID|g" "$root"/main.*.js
sed -i "s|__CYPRESS__|$CYPRESS|g" "$root"/main.*.js

exec nginx -g 'daemon off;'
