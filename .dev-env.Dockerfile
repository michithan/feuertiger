FROM gitpod/workspace-postgres

# To avoid bricked workspaces (https://github.com/gitpod-io/gitpod/issues/1171)
ARG DEBIAN_FRONTEND=noninteractive

# Install cypress dependencies
RUN sudo apt-get update \
    && sudo apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    && sudo apt-get install -y chromium-browser \
    && sudo apt-get clean

# Create feuertiger database
RUN psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" && createdb -O feuertiger feuertiger

# Install lerna && firebase cli
RUN npm i -g lerna \
    && npm i -g firebase-tools

# Increase nodejs memory
RUN export NODE_OPTIONS="--max-old-space-size=4096"