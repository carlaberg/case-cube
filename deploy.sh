#!/bin/bash

logger 'bule' \
echo 'Installing dependencies' \
&& npm install \
&& echo 'Done installing dependencies' \
&& echo 'Prepearing production build' \
&& npm run build \
&& echo 'Done prepearing production build' \
&& echo 'Cleaning public folder' \
&& rm -rf /var/www/case-cube.carlaberg.se/public_html/* \
&& echo 'Done cleaning public folder' \
&& echo 'Copying new production build to public folder' \
&& cp -r public/. /var/www/case-cube.carlaberg.se/public_html/ \
&& echo 'Done copying new production build to public folder' \
&& echo 'Restarting node server' \
&& pm2 restart caseCubeApi \
&& echo 'Done restarting node server' \
&& echo 'Deploy done'