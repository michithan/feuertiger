FROM quay.io/centos/centos:stream9

COPY ./repos /etc/yum.repos.d

WORKDIR /scripts

COPY ./scripts/install.bash .
RUN bash -f install.bash

COPY ./scripts/setup-podman.bash .
RUN bash -f setup-podman.bash
ENV _CONTAINERS_USERNS_CONFIGURED=""
ENV XDG_RUNTIME_DIR=/run/user/1000

COPY ./scripts/setup-pwsh.ps1 .
RUN pwsh -f setup-pwsh.ps1

COPY ./scripts/setup-vim.ps1 .
RUN pwsh -f setup-vim.ps1

WORKDIR /workspace