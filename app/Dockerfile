FROM node:10

ENV NODE_ENV 'production'

ENV API_URL '__API_URL__'
ENV WEBSITE_URL '__WEBSITE_URL__'
ENV GOOGLE_ANALYTICS_ID '__GOOGLE_ANALYTICS_ID__'
ENV DEBUG '__DEBUG__'

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false --frozen-lockfile

COPY public /app/public
COPY src /app/src

COPY webpack /app/webpack
COPY webpack.config.js tsconfig.json babel.config.json /app/
RUN yarn build
RUN cp -r dist instrumented && yarn nyc instrument --in-place instrumented

COPY .eslintignore .eslintrc.json .eslintrc.ci.json /app/
RUN yarn lint

COPY jest.config.js jest.setup.ts /app/
RUN yarn test

FROM nginx

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www
WORKDIR /var/www/zc-app

COPY --from=0 /app/dist /var/www/zc-app
COPY --from=0 /app/instrumented /var/www/zc-app_instrumented

CMD /start.sh
