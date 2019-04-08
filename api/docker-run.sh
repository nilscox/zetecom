docker run \
  -it \
  --name cdv \
  --network host \
  --publish 3000:80 \
  --env DB_HOST \
  --env DB_PORT \
  --env DB_USER \
  --env DB_PASS \
  --env DB_NAME \
  --env SESSION_SECRET \
  cdv \
  "$@"
