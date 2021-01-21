FROM node:14 as build

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
RUN yarn test:unit

FROM node:14-slim as runtime

# RUN apt update

WORKDIR /app
COPY --from=build /app/dist /app
COPY --from=build /app/yarn.lock /app
COPY --from=build /app/ormconfig.js /app

RUN yarn --frozen-lockfile

CMD yarn db:migrate && node src/main.js
