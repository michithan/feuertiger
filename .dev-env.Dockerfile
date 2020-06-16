FROM gitpod/workspace-postgres

# Install cypress dependencies
RUN sudo apt-get update \
    && sudo DEBIAN_FRONTEND=noninteractive apt-get install -yq \
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
    && sudo rm -rf /var/lib/apt/lists/* \
    && sudo apt-get clean

# Create feuertiger database
RUN sudo pg_start && psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" && createdb -O feuertiger feuertiger

# Install lerna && firebase cli
RUN npm i -g lerna \
    && npm i -g firebase-tools

# Increase nodejs memory
RUN export NODE_OPTIONS="--max-old-space-size=4096"