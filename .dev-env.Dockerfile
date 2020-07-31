# Start from alpine
FROM alpine:3.12.0

ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV PATH=$PATH:/root/.pulumi/bin:/:/workspaces/feuertiger/cli/bin:/
ENV PULUMI_CONFIG_PASSPHRASE="feuertiger"

# Install basics
RUN apk update && apk add --no-cache \
    # apt-transport-https \
    # libasound2 \
    # libgconf-2-4 \
    # libgtk-3-0 \
    # libgtk2.0-0 \
    # libnss3 \
    # libxss1 \
    # libxtst6 \
    bash \
    binutils \
    ca-certificates \
    chromium \
    coreutils  \
    curl \
    docker \
    findutils \
    g++ \
    gcc \
    git \
    gnupg \
    grep  \
    groff \
    icu-libs \
    krb5-libs \
    less \
    libc-dev \
    libc6-compat \
    libffi-dev \
    libgcc \
    libintl \
    libnotify-dev \
    libssl1.1 \
    libstdc++ \
    linux-headers \
    make \
    ncurses  \
    ncurses-terminfo-base \
    nodejs-current \
    npm \
    openssl  \
    openssl-dev \
    openrc \
    postgresql \
    postgresql-contrib \
    py-pip \
    python2  \
    python3-dev \
    sudo \
    tzdata \
    unzip \
    userspace-rcu \
    util-linux \
    wget \
    xauth \
    xvfb \
    yarn \
    zlib \
    zsh

# Install zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Use zsh as default shell
SHELL ["zsh", "-c"]

# Install powershell
RUN sudo apk -X https://dl-cdn.alpinelinux.org/alpine/edge/main add --no-cache lttng-ust \
    && curl -L https://github.com/PowerShell/PowerShell/releases/download/v7.0.3/powershell-7.0.3-linux-alpine-x64.tar.gz -o /tmp/powershell.tar.gz \
    && sudo mkdir -p /opt/microsoft/powershell/7 \
    && sudo tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell/7 \
    && sudo chmod +x /opt/microsoft/powershell/7/pwsh \
    && sudo ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh

# Install docker-compose
RUN pip3 install docker-compose

# Enable postgres openrc service
RUN openrc || rc-update add postgresql

# Install pulumi
RUN curl -fsSL https://get.pulumi.com/ | sh
RUN pulumi login -l \
    # && pulumi plugin install resource gcp v3.15.0 \
    && pulumi plugin install resource gitlab v2.5.0 \
    && pulumi plugin install resource kubernetes v2.4.1

# Install doctl
RUN curl -L https://github.com/digitalocean/doctl/releases/download/v1.23.1/doctl-1.23.1-linux-amd64.tar.gz | tar xz

# Install kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.18.6/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl \
    && sudo mv ./kubectl /usr/local/bin/kubectl

# Install helm
RUN curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 \
    && chmod 700 get_helm.sh \
    && ./get_helm.sh

# Install lerna
RUN npm i -g lerna typescript

# Use PowerShell
ENTRYPOINT zsh