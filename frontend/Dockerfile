FROM node:10

ENV NODE_ENV='production'

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn --production=false

ADD . /app

RUN yarn build
RUN yarn lint

FROM nginx

#RUN apt-get update
#RUN apt-get install curl procps lsof

RUN mkdir /logs
COPY nginx.template.conf /nginx.template.conf

RUN mkdir -p /var/www
WORKDIR /var/www

COPY --from=0 /app/dist /var/www

CMD ["/bin/bash", "-c", "envsubst '$API_URL' < /nginx.template.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
