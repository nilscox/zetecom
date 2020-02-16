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

RUN yarn --production=false --frozen-lockfile

COPY public /app/public
COPY src /app/src
COPY .eslintignore .eslintrc.json tsconfig.json babel.config.js webpack.config.js jest.config.js jest.setup.ts /app/

RUN yarn build
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
WORKDIR /var/www

COPY --from=0 /app/dist /var/www

CMD /start.sh
