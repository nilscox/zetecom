#!/usr/bin/env bash

env="local"
image="nilscox/zetecom-api:$(git rev-parse HEAD)"
port="4242"

docker_host="https://localhost:2375"
docker_auth=""
base_dir="./data/zetecom-local"

while [ -n "$1" ]; do
  case "$1" in
    --env)
      env="$2"
      shift; shift;;

    --image)
      image="$2"
      shift; shift;;

    --port)
      port="$2"
      shift; shift;;

    --docker-host)
      docker_host="$2"
      shift; shift;;

    --docker-auth)
      docker_auth="$2"
      shift; shift;;

    --base-dir)
      base_dir="$2"
      shift; shift;;

    *)
      echo "warning: unkonwn argument \"$1\"" >&2
      shift;;
  esac
done

container="zc-api-$env"
network="zc-network-$env"

dkr() {
  path="$1"; shift

  curl -v \
    "$docker_host$path" \
    -u "$docker_auth" \
    --header 'Content-Type: application/json' \
    "$@"

  if [ "$?" -ne 0 ]; then
    exit 1
  fi
}

dkr "/containers/$container?force=true" --request DELETE

dkr "/containers/create?name=$container" --data '{
  "Image": "'"$image"'",
  "ExposedPorts": {
    "80/tcp": {}
  },
  "HostConfig": {
    "NetworkMode": "'"$network"'",
    "PortBindings": {
      "80/tcp": [{ "HostIp": "127.0.0.1", "HostPort": "'"$port"'" }]
    },
    "Binds": [
      "'"$base_dir"'/avatars:/app/avatars:rw"
    ]
  },
  "Env": [
    "LISTEN_IP=0.0.0.0",
    "LISTEN_PORT=80",
    "LOG_LEVEL='"$LOG_LEVEL"'",
    "TRUST_PROXY='"$TRUST_PROXY"'",
    "REFLECT_ORIGIN='"$REFLECT_ORIGIN"'",
    "ADMIN_USER='"$ADMIN_USER"'",
    "APP_URL='"$APP_URL"'",
    "WEBSITE_URL='"$WEBSITE_URL"'",
    "DB_HOST='"$DB_HOST"'",
    "DB_PORT='"$DB_PORT"'",
    "DB_USER='"$DB_USER"'",
    "DB_PASS='"$DB_PASS"'",
    "DB_NAME='"$DB_NAME"'",
    "DB_ENTITIES='"$DB_ENTITIES"'",
    "DB_MIGRATIONS='"$DB_MIGRATIONS"'",
    "DB_SEEDS='"$DB_SEEDS"'",
    "REDIS_HOST='"$REDIS_HOST"'",
    "REDIS_PORT='"$REDIS_PORT"'",
    "EMAIL_HOST='"$EMAIL_HOST"'",
    "EMAIL_PORT='"$EMAIL_PORT"'",
    "EMAIL_USER='"$EMAIL_USER"'",
    "EMAIL_PASSWORD='"$EMAIL_PASSWORD"'",
    "EMAIL_SECURE='"$EMAIL_SECURE"'",
    "EMAIL_BYPASS='"$EMAIL_BYPASS"'",
    "EMAIL_ACCOUNT_VERIFICATION='"$EMAIL_ACCOUNT_VERIFICATION"'",
    "EMAIL_FROM='"$EMAIL_FROM"'",
    "SESSION_SECRET='"$SESSION_SECRET"'",
    "SECURE_COOKIE='"$SECURE_COOKIE"'",
    "USER_AVATAR_DESTINATION='"$USER_AVATAR_DESTINATION"'"
  ]
}'

dkr "/containers/$container/start" --request POST
