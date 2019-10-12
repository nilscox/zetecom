FROM node:10

ENV NODE_ENV 'production'

ENV API_URL '__API_URL__'
ENV BASE_URL '__BASE_URL__'
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

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs

COPY nginx.template.conf /nginx.template.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /var/www
WORKDIR /var/www

COPY --from=0 /app/dist /var/www

CMD /start.sh
