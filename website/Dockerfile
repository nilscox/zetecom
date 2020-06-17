FROM node:10

ENV NODE_ENV 'production'

ENV CHROME_EXTENSION_URL 'https://CHROME_EXTENSION_URL'
ENV FIREFOX_ADDON_URL 'https://FIREFOX_ADDON_URL'
ENV REPOSITORY_URL 'https://REPOSITORY_URL'
ENV GOOGLE_ANALYTICS_ID 'GOOGLE_ANALYTICS_ID'

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
