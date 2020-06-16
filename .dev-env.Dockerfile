FROM gitpod/workspace-postgres

# Install sudo && curl && cypress dependencies
RUN apt-get update \
    && apt-get -y install sudo \
    && sudo apt upgrade -y \
    && sudo apt install -y curl \
    && sudo apt install -y libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    && sudo apt install -y chromium \
    && sudo apt clean

# Create feuertiger database
RUN psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" && createdb -O feuertiger feuertiger

# Setup PostgreSQL server for user gitpod
ENV PATH="$PATH:/usr/lib/postgresql/12/bin"
ENV PGDATA="/workspace/.pgsql/data"
RUN mkdir -p ~/.pg_ctl/bin ~/.pg_ctl/sockets \
    && printf '#!/bin/bash\n[ ! -d $PGDATA ] && mkdir -p $PGDATA && initdb -D $PGDATA\npg_ctl -D $PGDATA -l ~/.pg_ctl/log -o "-k ~/.pg_ctl/sockets" start\n' > ~/.pg_ctl/bin/pg_start \
    && printf '#!/bin/bash\npg_ctl -D $PGDATA -l ~/.pg_ctl/log -o "-k ~/.pg_ctl/sockets" stop\n' > ~/.pg_ctl/bin/pg_stop \
    && chmod +x ~/.pg_ctl/bin/*
ENV PATH="$PATH:$HOME/.pg_ctl/bin"

# Install lerna && firebase cli
RUN npm i -g lerna \
    && npm i -g firebase-tools

# Increase nodejs memory
RUN export NODE_OPTIONS="--max-old-space-size=4096"
