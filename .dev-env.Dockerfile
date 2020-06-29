FROM node:10.19.0-buster

# Increase nodejs memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install sudo && curl && cypress dependencies && postgres
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
                apt-transport-https \
                ca-certificates \
                gnupg \
                xvfb \
                postgresql \
                postgresql-contrib \
    && update-rc.d postgresql enable

USER postgres
RUN /etc/init.d/postgresql start \
    && psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" \
    && createdb -O feuertiger feuertiger
USER root

# Install pulumi
RUN curl -fsSL https://get.pulumi.com/ | sh \
    && export PATH=$PATH:~/.pulumi/bin \
    && export PULUMI_CONFIG_PASSPHRASE="feuertiger" \
    && pulumi plugin install resource gcp v3.11.0 \
    && pulumi plugin install resource kubernetes v2.3.1 \
    && pulumi login -l

# Install google cloud cli
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - \
    && sudo apt update \
    && sudo apt install -y google-cloud-sdk

# Install kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl \
    && sudo mv ./kubectl /usr/local/bin/kubectl

# Install lerna && firebase cli
RUN npm i -g lerna firebase-tools