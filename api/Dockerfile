FROM node:10

ENV NODE_ENV='production'

RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false

ADD . /app

RUN yarn build
RUN yarn lint

CMD yarn start:prod
