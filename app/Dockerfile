FROM node:14

ENV NODE_ENV 'production'

ENV API_URL '__API_URL__'
ENV WEBSITE_URL '__WEBSITE_URL__'
ENV ANALYTICS_URL '__ANALYTICS_URL__'
ENV ANALYTICS_SITE_ID '__ANALYTICS_SITE_ID__'
ENV SENTRY_DSN '__SENTRY_DSN__'
ENV DEBUG '__DEBUG__'

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml /app/
COPY .yarn /app/.yarn
RUN yarn install

COPY . /app

RUN yarn build

# RUN cp -r dist instrumented && yarn nyc instrument --in-place instrumented

FROM nginx:alpine

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www
WORKDIR /var/www/zc-app

COPY --from=0 /app/dist /var/www/zc-app
COPY --from=0 /app/dist /var/www/zc-app_instrumented
# COPY --from=0 /app/instrumented /var/www/zc-app_instrumented

CMD /start.sh
