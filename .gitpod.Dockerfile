FROM node:10.19.0-buster

USER gitpod

RUN npm i -g lerna
RUN yarn
RUN yarn bootstrap