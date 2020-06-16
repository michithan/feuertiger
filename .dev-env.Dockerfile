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

# install node v10.19.0
ENV NODE_VERSION=10.19.0
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN bash -c ". .nvm/nvm.sh && nvm install v10.19.0 && nvm uninstall default && nvm alias default v10.19.0 && nvm use default"
ENV PATH=$PATH:/home/gitpod/.nvm/versions/node/v${NODE_VERSION}/bin

# Install lerna && firebase cli
RUN npm i -g lerna firebase-tools