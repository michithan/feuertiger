FROM node:10.19.0-buster

RUN npm i -g lerna
RUN yarn
RUN yarn bootstrap

USER gitpod
