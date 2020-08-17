#!/bin/bash

set -e

# Execute the container original CMD
exec "$@" &

# Wait until MySQL is running...
until nc -z localhost 3306
do
  sleep 1
done

# If this is the first run, then we run the installation steps from the Wiki
if [ ! -f "/var/www/html/dearscholar.php" ] ; then
  echo "#############################################"
  echo "Initializing DearScholar database, step 1 ..."
  mysql -uroot < /Installation/mysql-part1.sql
  echo "Creating sample study ..."
  php /Installation/samplestudy-part1.php
  mysql -uroot -Dproject < /Installation/samplestudy-part2.sql
  echo "Finishing the database, step 2 ..."
  mysql -uroot -Dproject < /Installation/mysql-part2.sql
  echo "DearScholar database initialized!"
  echo "#############################################"

  cp -T /Installation/dearscholar.php /var/www/html/dearscholar.php
fi

wait
