# This is a development image, do not use for production hosting
# or in an insecure environment.

FROM mattrayner/lamp:latest-1804

COPY Installation/docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh

# Copy installation files over to the container
RUN mkdir /installation
COPY Installation/* /installation/

RUN cp -T /installation/dearscholar.php /var/www/html/dearscholar.php

# Install nc, to check for MySQL socket status in the docker-entrypoint.sh
RUN apt-get install -y netcat

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/run.sh"]
