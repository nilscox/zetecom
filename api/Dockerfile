FROM node:10

ENV NODE_ENV='production'

RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn

ADD . /app

RUN yarn build

CMD yarn start:prod
