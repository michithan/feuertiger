# Start from alpine
FROM ubuntu:20.04

RUN apt-get update \
  # Install basics
  && apt-get install --yes \
  git \
  curl \
  zsh \
  apt-transport-https \
  ca-certificates \
  sudo \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \ 
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  # Add repos
  && curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash - \
  && sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list \
  # Install tools
  && apt-get update \
  && apt-get install --yes \
  nodejs \
  kubectl \
  && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
  && apt-get clean

# Use zsh as default shell
SHELL ["zsh", "-c"]

# ENV NODE_OPTIONS="--max-old-space-size=4096"
# ENV DENO_INSTALL=/root/.deno
# ENV PATH=$PATH:/root/.pulumi/bin:/:/workspaces/feuertiger/cli/bin:/builds/workspaces/feuertiger/cli/bin:/root/google-cloud-sdk/bin:/:/root/.deno/bin
# ENV PULUMI_CONFIG_PASSPHRASE="feuertiger"
# ENV POSTGRES_URI="postgresql://feuertiger:feuertiger@postgres:5432/feuertiger"

# # Add legacy repo
# RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.8/main' >> /etc/apk/repositories

# # Install basics
# RUN apk update && apk add --no-cache \
#     # apt-transport-https \
#     # libasound2 \
#     # libgconf-2-4 \
#     # libgtk-3-0 \
#     # libgtk2.0-0 \
#     # libnss3 \
#     # libxss1 \
#     # libxtst6 \
#     alpine-sdk \
#     bash \
#     binutils \
#     cargo \
#     ca-certificates \
#     chromium \
#     coreutils  \
#     curl \
#     desktop-file-utils \
#     docker \
#     findutils \
#     g++ \
#     gcc \
#     git \
#     gnome-keyring \
#     gnupg \
#     grep  \
#     groff \
#     icu \
#     icu-dev \
#     icu-libs \
#     krb5 \
#     krb5-libs \
#     less \
#     libc-dev \
#     libc6-compat \
#     libffi-dev \
#     libgcc \
#     libintl \
#     libnotify-dev \
#     libsecret \
#     # libssl1.0 \
#     libssl1.1 \
#     libstdc++ \
#     linux-headers \
#     make \
#     musl-dev \
#     ncurses  \
#     ncurses-terminfo-base \
#     net-tools \
#     nodejs-current \
#     openssl  \
#     openssl-dev \
#     openrc \
#     # powerline-extra-symbols \
#     py-pip \
#     python2  \
#     python3-dev \
#     sudo \
#     tzdata \
#     unzip \
#     userspace-rcu \
#     util-linux \
#     wget \
#     which \
#     xauth \
#     xprop \
#     xvfb \
#     yarn \
#     zlib \
#     zsh

# # VSCode live share
# RUN wget -O ~/vsls-reqs https://aka.ms/vsls-linux-prereq-script && chmod +x ~/vsls-reqs && ~/vsls-reqs

# # Install zsh
# RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
#     # use agnoster theme
#     && sed -i 's/robbyrussell/agnoster/g' ~/.zshrc \
#     # dont use git promt, since info is already shown in vs code and it slows down the cli
#     && sed -i 's/  prompt_git/  #prompt_git/g' ~/.oh-my-zsh/themes/agnoster.zsh-theme

# # Use zsh as default shell
# SHELL ["zsh", "-c"]

# # Install powershell
# RUN sudo apk -X https://dl-cdn.alpinelinux.org/alpine/edge/main add --no-cache lttng-ust \
#     && curl -L https://github.com/PowerShell/PowerShell/releases/download/v7.0.3/powershell-7.0.3-linux-alpine-x64.tar.gz -o /tmp/powershell.tar.gz \
#     && sudo mkdir -p /opt/microsoft/powershell/7 \
#     && sudo tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell/7 \
#     && sudo chmod +x /opt/microsoft/powershell/7/pwsh \
#     && sudo ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh

# # Install docker-compose
# RUN pip3 install docker-compose

# # Install pulumi
# RUN curl -fsSL https://get.pulumi.com/ | sh
# RUN pulumi plugin install resource digitalocean v3.2.0 \
#     && pulumi plugin install resource kubernetes v2.7.5 \
#     && pulumi plugin install resource gcp v4.6.0

# # Install doctl
# RUN curl -L https://github.com/digitalocean/doctl/releases/download/v1.23.1/doctl-1.23.1-linux-amd64.tar.gz | tar xz

# # Install kubectl
# RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.18.6/bin/linux/amd64/kubectl \
#     && chmod +x ./kubectl \
#     && sudo mv ./kubectl /usr/local/bin/kubectl

# # Install google cloud cli
# RUN curl https://sdk.cloud.google.com > install.sh \
#     && bash install.sh --disable-prompts

# # Install helm
# RUN curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 \
#     && chmod 700 get_helm.sh \
#     && ./get_helm.sh

# # Install lerna
# RUN yarn global add lerna typescript ts-node prisma

# # Install deno
# RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.0