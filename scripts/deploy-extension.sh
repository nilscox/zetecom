#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

prepare_deployment() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ]; then
    echo 'usage: deploy-api.sh [staging|production]' >&2
    exit 1
  fi

  echo "Environment: $environment"
}

setup_environment () {
  load_env deploy.env
  load_env extension.env
  echo

  echo "Environment variables:"
  echo_env extension.env
  echo

  echo "Deployment variables:"
  echo_vars deploy_user deploy_host extension_image extension_port
}

deploy_extension() {
  execute ssh "$deploy_user@$deploy_host" docker pull "$extension_image"
  execute ssh "$deploy_user@$deploy_host" docker rm -f "ri-extension-$environment" || true
  execute ssh "$deploy_user@$deploy_host" docker run -dt \
    --name "ri-extension-$environment" \
    --network "ri-network-$environment" \
    -p "$extension_port:80" \
    --volume "$base_dir/logs:/logs:rw" \
    --volume "$base_dir/avatars:/var/www/assets/images/avatars:ro" \
    --env NODE_ENV='production' \
    --env HOST='0.0.0.0' \
    --env PORT='80' \
    --env API_URL=\'"$API_URL"\' \
    --env EXTENSION_URL=\'"$EXTENSION_URL"\' \
    --env WEBSITE_URL=\'"$WEBSITE_URL"\' \
    "$extension_image"
}

main() {
  echo_title "Deploy extension"
  step "Prepare deployment" prepare_deployment
  step "Setup environment" setup_environment
  step "Deploy extension" deploy_extension
  echo "Deployment success"
}

main
