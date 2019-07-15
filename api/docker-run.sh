#!/usr/bin/env sh

err() {
  echo "$@" >&2
  exit 1
}

if [ -z "$DOCKER_CONTAINER_NAME" ]; then err 'missing env DOCKER_CONTAINER_NAME'; fi
if [ -z "$DOCKER_NETWORK" ]; then err 'missing env DOCKER_NETWORK'; fi
if [ -z "$DOCKER_LISTEN_PORT" ]; then err 'missing env DOCKER_LISTEN_PORT'; fi
if [ -z "$DOCKER_AVATAR_VOLUME" ]; then err 'missing env DOCKER_AVATAR_VOLUME'; fi

DOCKER_ARGS='-dt'

if [ -n "$DOCKER_INTERACTIVE" -a "$DOCKER_INTERACTIVE" == 'true' ]; then DOCKER_ARGS='-it'; fi

docker run \
  "$DOCKER_ARGS" \
  --name "$DOCKER_CONTAINER_NAME" \
  --network "$DOCKER_NETWORK" \
  --publish "$DOCKER_LISTEN_PORT":80 \
  --volume "$DOCKER_AVATAR_VOLUME:/avatars" \
  --env NODE_ENV \
  --env LISTEN_IP \
  --env LISTEN_PORT \
  --env BASE_URL \
  --env DB_HOST \
  --env DB_PORT \
  --env DB_USER \
  --env DB_PASS \
  --env DB_NAME \
  --env DB_SYNC \
  --env DB_ENTITIES \
  --env DB_DEBUG \
  --env EMAIL_HOST \
  --env EMAIL_USER \
  --env EMAIL_PASSWORD \
  --env EMAIL_TEMPLATE_DIR \
  --env EMAIL_EXCLUDE_REGEX \
  --env SESSION_SECRET \
  --env USER_AVATAR_DESTINATION='/avatars' \
  cdv \
  "$@"
