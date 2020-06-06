#!/usr/bin/env bash

root='/var/www/ri-app'

if [ "$1" == "--ci" ]; then
  root='/var/www/ri-app_instrumented'
fi

sed -i "s|__ROOT_DIR__|$root|" /etc/nginx/conf.d/default.conf

sed -i "s|__API_URL__|$API_URL|g" "$root/main.js"
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" "$root/main.js"

exec nginx -g 'daemon off;'
