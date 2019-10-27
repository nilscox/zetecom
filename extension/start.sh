#!/usr/bin/env bash

sed -i "s|__API_URL__|$API_URL|g" /var/www/main.js
sed -i "s|__BASE_URL__|$BASE_URL|g" /var/www/main.js
sed -i "s|__WEBSITE_URL__|$WEBSITE_URL|g" /var/www/main.js
sed -i "s|__CHROME_EXTENSION_URL__|$CHROME_EXTENSION_URL|g" /var/www/main.js
sed -i "s|__REPOSITORY_URL__|$REPOSITORY_URL|g" /var/www/main.js

exec nginx -g 'daemon off;'
