FROM node:10.19.0-buster

# Install sudo
RUN apt-get update \
    && apt-get -y install sudo

# Install curl
RUN sudo apt upgrade -y \
    && sudo apt install -y curl

# Install lerna
RUN npm i -g lerna

# Install firebase cli
RUN npm i -g firebase-tools

USER gitpod
