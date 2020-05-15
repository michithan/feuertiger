FROM feuertiger/feuertiger-dev-environment:latest

ADD . /workspace

RUN cd /workspace && yarn && yarn build

WORKDIR /workspace