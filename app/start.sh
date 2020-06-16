#!/usr/bin/env bash

root='/var/www/zc-app'

if [ "$1" == "--ci" ]; then
  root='/var/www/zc-app_instrumented'
fi

sed -i "s|__ROOT_DIR__|$root|" /etc/nginx/conf.d/default.conf

sed -i "s|__API_URL__|$API_URL|g" "$root/main.js"
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" "$root/main.js"

sed -i "s|__ENABLE_TRACKING__|$ENABLE_TRACKING|g" "$root/index.html"
sed -i "s|__GTM_CONTAINER_ID__|$GTM_CONTAINER_ID|g" "$root/index.html"
sed -i "s|__GA_ID__|$GA_ID|g" "$root/index.html"

exec nginx -g 'daemon off;'
