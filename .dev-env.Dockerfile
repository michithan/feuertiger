# Start from alpine
FROM apline:3.12.0

# Install basics
RUN apk update \
    && apk add --no-cache \
                nodejs \ 
                npm \
                yarn \
                sudo \
                curl \
                chromium \
                # libgtk2.0-0 \
                # libgtk-3-0 \
                libnotify-dev \
                # libgconf-2-4 \
                # libnss3 \
                # libxss1 \
                # libasound2 \
                # libxtst6 \
                xauth \
                # apt-transport-https \
                ca-certificates \
                gnupg \
                xvfb \
                postgresql \
                postgresql-contrib \
    && export NODE_OPTIONS="--max-old-space-size=4096"
    && update-rc.d postgresql enable

USER postgres
RUN /etc/init.d/postgresql start \
    && psql --command "CREATE USER feuertiger WITH SUPERUSER PASSWORD 'feuertiger';" \
    && createdb -O feuertiger feuertiger
USER root

# Install pulumi
RUN curl -fsSL https://get.pulumi.com/ | sh
ENV PATH=$PATH:/root/.pulumi/bin
ENV PULUMI_CONFIG_PASSPHRASE="feuertiger"
RUN pulumi login -l \
    && pulumi plugin install resource gcp v3.11.0 \
    && pulumi plugin install resource kubernetes v2.3.1

# Install google cloud cli
RUN curl -sSL https://sdk.cloud.google.com > /tmp/gcl && bash /tmp/gcl --install-dir=~/gcloud --disable-prompts \
    && export PATH=$PATH:~/gcloud/google-cloud-sdk/bin

# Install kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl \
    && sudo mv ./kubectl /usr/local/bin/kubectl

# Install lerna && firebase cli
RUN npm i -g lerna