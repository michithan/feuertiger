FROM ubuntu:20.10

# Install node and npm
RUN apt update \
    && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion \
    && nvm install v10.19.0 \
    && nvm use v10.19.0 \
    && npm i --no-optional --unsafe-perm -g

# Install lerna
RUN npm i -g lerna

# Install firebase cli
RUN curl -sL https://firebase.tools | bash

USER gitpod
