FROM node:10

ENV NODE_ENV 'production'

ENV API_URL '__API_URL__'
ENV WEBSITE_URL '__WEBSITE_URL__'

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false --frozen-lockfile

COPY public /app/public
COPY webpack /app/webpack
COPY webpack.config.js tsconfig.json babel.config.js /app/
COPY jest.config.js jest.setup.ts /app/
COPY .eslintignore .eslintrc.json /app/

COPY src /app/src

RUN yarn concurrently "yarn build" "yarn build:coverage"
RUN yarn lint
RUN yarn test

FROM nginx

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www
WORKDIR /var/www/ri-app

COPY --from=0 /app/dist /var/www/ri-app
COPY --from=0 /app/instrumented /var/www/ri-app_instrumented

CMD /start.sh
