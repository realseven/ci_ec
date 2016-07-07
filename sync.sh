#!/bin/bash
rsync -arq /media/sf_ci_ec/sync.sh /var/www/sync.sh
rsync -arq /var/www/html/ci/application/logs/ /media/sf_ci_ec/html/ci/application/logs
rsync -arq /media/sf_ci_ec/html/ /var/www/html
#rsync -arq --delete /media/sf_ci_ec/html/ /var/www/html
chown -R $USER:www-data /var/www
chmod -R 777 /var/www
