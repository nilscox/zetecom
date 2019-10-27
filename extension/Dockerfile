FROM node:10

ENV NODE_ENV 'production'

ENV API_URL '__API_URL__'
ENV EXTENSION_URL '__EXTENSION_URL__'
ENV WEBSITE_URL '__WEBSITE_URL__'
ENV CHROME_EXTENSION_URL '__CHROME_EXTENSION_URL__'
ENV REPOSITORY_URL '__REPOSITORY_URL__'

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false

COPY public /app/public
COPY src /app/src
COPY .eslintignore /app
COPY .eslintrc.json /app
COPY tsconfig.json /app
COPY webpack.config.js /app

RUN yarn build
RUN yarn lint

FROM nginx

RUN apt update

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www
WORKDIR /var/www

COPY --from=0 /app/dist /var/www

CMD /start.sh
