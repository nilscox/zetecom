#!/usr/bin/env bash

sed -i "s|__API_URL__|$API_URL|g" /var/www/main.js
sed -i "s|__BASE_URL__|$BASE_URL|g" /var/www/main.js
sed -i "s|__CHROME_EXTENSION_URL__|$CHROME_EXTENSION_URL|g" /var/www/main.js
sed -i "s|__REPOSITORY_URL__|$REPOSITORY_URL|g" /var/www/main.js

envsubst '$API_UPSTREAM' < /nginx.template.conf > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
