#!/bin/bash
rsync -arq --delete /media/sf_ci_ec/html/ /var/www/html
chown -R $USER:www-data /var/www
chmod -R 777 /var/www
