#!/usr/bin/env bash

sed -i "s|__API_URL__|$API_URL|g" /var/www/main.js
sed -i "s|__EXTENSION_URL__|$EXTENSION_URL|g" /var/www/main.js
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" /var/www/main.js

exec nginx -g 'daemon off;'
