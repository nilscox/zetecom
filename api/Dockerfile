FROM node:10

ENV NODE_ENV='production'

ENV LISTEN_IP=0.0.0.0
ENV LISTEN_PORT=80

ENV DB_SYNC=false
ENV DB_ENTITIES=dist/src/**/*.entity.js
ENV DB_DEBUG=false

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN yarn install --production

COPY . /app

RUN yarn build

CMD yarn start:prod
