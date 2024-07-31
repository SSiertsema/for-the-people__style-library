#!/bin/sh
set -e

echo "Starting SSH ..."
service ssh start

echo "Creating NGINX config from template."
envsubst < /etc/nginx/conf.d/nginx.tmpl > /etc/nginx/conf.d/nginx.conf

echo "Starting PM2"
cd /webroot && pm2 start ecosystem.config.js

echo "Starting NGINX with config below"
cat /etc/nginx/conf.d/nginx.conf
nginx -g 'daemon off;'
