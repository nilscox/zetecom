FROM node:10

ENV NODE_ENV 'production'

ENV CHROME_EXTENSION_URL 'http://CHROME_EXTENSION_URL'
ENV REPOSITORY_URL 'https://REPOSITORY_URL'

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false

COPY static /app/static
COPY src /app/src
COPY tsconfig.json /app
COPY webpack.config.js /app

RUN yarn build

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html
