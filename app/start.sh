#!/usr/bin/env bash

root='/var/www/zc-app'

if [ "$1" == "--coverage" ]; then
  root='/var/www/zc-app_instrumented'
fi

sed -i "s|__ROOT_DIR__|$root|" /etc/nginx/conf.d/default.conf

sed -i "s|__API_URL__|$API_URL|g" "$root"/main.*.js
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" "$root"/main.*.js
sed -i "s|__ANALYTICS_URL__|$ANALYTICS_URL|g" "$root"/main.*.js
sed -i "s|__ANALYTICS_SITE_ID__|$ANALYTICS_SITE_ID|g" "$root"/main.*.js
sed -i "s|__SENTRY_DSN__|$SENTRY_DSN|g" "$root"/main.*.js
sed -i "s|__DEBUG__|$DEBUG|g" "$root"/main.*.js

exec nginx -g 'daemon off;'
