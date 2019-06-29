docker run \
  -it \
  --name cdv \
  --network cdv-network \
  --publish 3000:80 \
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
  cdv \
  "$@"
