FROM node:14

ENV NODE_ENV 'production'

ENV SNOWPACK_PUBLIC_API_URL '__API_URL__'
ENV SNOWPACK_PUBLIC_WEBSITE_URL '__WEBSITE_URL__'
ENV SNOWPACK_PUBLIC_ANALYTICS_URL '__ANALYTICS_URL__'
ENV SNOWPACK_PUBLIC_ANALYTICS_SITE_ID '__ANALYTICS_SITE_ID__'
ENV SNOWPACK_PUBLIC_SENTRY_DSN '__SENTRY_DSN__'
ENV SNOWPACK_PUBLIC_DEBUG '__DEBUG__'

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app

RUN yarn build
RUN yarn lint
RUN yarn test

RUN cp -r build instrumented && yarn nyc instrument --in-place instrumented

FROM nginx:alpine

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www
WORKDIR /var/www/zc-app

COPY --from=0 /app/build /var/www/zc-app
COPY --from=0 /app/instrumented /var/www/zc-app_instrumented

CMD /start.sh
