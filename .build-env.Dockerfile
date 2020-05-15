FROM feuertiger/feuertiger-dev-environment:latest

ADD . /workspace

WORKDIR /workspace

RUN yarn