FROM ubuntu:18.04

# Install sudo
RUN apt-get update \
    && apt-get -y install sudo

# Install curl
RUN sudo apt upgrade -y \
    && sudo apt install -y curl

# Install node and npm
RUN sudo apt install nodejs=10.19.0 \
    && sudo apt install npm

# Install lerna
RUN npm i -g lerna

# Install firebase cli
RUN curl -sL https://firebase.tools | bash

USER gitpod
