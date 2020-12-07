FROM node:10

ENV NODE_ENV 'production'

ENV APP_URL 'https://APP_URL'
ENV CHROME_EXTENSION_URL 'https://CHROME_EXTENSION_URL'
ENV FIREFOX_ADDON_URL 'https://FIREFOX_ADDON_URL'
ENV CHROME_EXTENSION_STAGING_URL 'https://CHROME_EXTENSION_STAGING_URL'
ENV FIREFOX_ADDON_STAGING_URL 'https://FIREFOX_ADDON_STAGING_URL'
ENV REPOSITORY_URL 'https://REPOSITORY_URL'
ENV ANALYTICS_URL 'ANALYTICS_URL'
ENV ANALYTICS_SITE_ID 'ANALYTICS_SITE_ID'
ENV CONTACT_EMAIL 'CONTACT_EMAIL'
ENV DISCORD_ID 'DISCORD_ID'
ENV FACEBOOK_PAGE 'FACEBOOK_PAGE'
ENV TWITTER_ACCOUNT 'TWITTER_ACCOUNT'

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false

COPY src /app/src
COPY static /app/static

COPY webpack.config.js tsconfig.json babel.config.json /app/
RUN yarn build

COPY .eslintrc .eslintignore /app/
RUN yarn lint

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html
