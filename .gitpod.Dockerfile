FROM node:10.19.0-buster

# Install lerna
RUN npm i -g lerna

# Install firebase cli
RUN curl -sL https://firebase.tools | bash

USER gitpod
