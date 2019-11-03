#!/bin/bash

npm install \
&& npm run build \
&& rm -rf /var/www/case-cube.carlaberg.se/public_html/* \
&& cp -r public/. /var/www/case-cube.carlaberg.se/public_html/ \
&& pm2 restart caseCubeApi
# echo ‘post-receive: Triggered.’
# echo ‘post-receive: pulling from repo…’
# git pull \
# && echo ‘Done pulling from repo’

#bulle