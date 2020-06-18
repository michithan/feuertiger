FROM node:10.19.0-buster

# Increase nodejs memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install sudo && curl && cypress dependencies
RUN apt update \
    && apt install -y sudo \
    && sudo apt upgrade -y \
    && sudo apt install -y \
                curl \
                chromium \
                libgtk2.0-0 \
                libgtk-3-0 \
                libnotify-dev \
                libgconf-2-4 \
                libnss3 \
                libxss1 \
                libasound2 \
                libxtst6 \
                xauth \
                xvfb

# Install postgres
RUN sudo apt install -y \
            postgresql \
            postgresql-contrib \
    && update-rc.d postgresql enable

USER postgres
RUN /etc/init.d/postgresql start \
    && psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" \
    && createdb -O feuertiger feuertiger
USER root

# Install lerna && firebase cli
RUN npm i -g lerna firebase-tools