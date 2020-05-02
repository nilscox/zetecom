FROM node:10

ENV NODE_ENV='production'

ENV LISTEN_IP='0.0.0.0'
ENV LISTEN_PORT='80'

RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false --frozen-lockfile

ADD . /app

RUN yarn build
RUN yarn lint
RUN yarn test:intg
RUN yarn test:e2e

CMD yarn start:prod
