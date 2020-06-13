#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

prepare_deployment() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ]; then
    echo 'usage: deploy-app.sh [staging|production]' >&2
    exit 1
  fi

  echo "Environment: $environment"
}

setup_environment () {
  load_env deploy.env
  load_env app.env
  echo

  echo "Environment variables:"
  echo_env app.env
  echo

  echo "Deployment variables:"
  echo_vars deploy_user deploy_host app_image app_port
}

deploy_app() {
  execute ssh "$deploy_user@$deploy_host" docker pull "$app_image"
  execute ssh "$deploy_user@$deploy_host" docker rm -f "zc-app-$environment" || true
  execute ssh "$deploy_user@$deploy_host" docker run -dt \
    --name "zc-app-$environment" \
    --network "zc-network-$environment" \
    -p "$app_port:80" \
    --volume "$base_dir/logs:/logs:rw" \
    --volume "$base_dir/avatars:/var/www/avatars:ro" \
    --env NODE_ENV='production' \
    --env HOST='0.0.0.0' \
    --env PORT='80' \
    --env $(sshenv API_URL) \
    --env $(sshenv WEBSITE_URL) \
    "$app_image"
}

main() {
  echo_title "Deploy app"
  step "Prepare deployment" prepare_deployment
  step "Setup environment" setup_environment
  step "Deploy app" deploy_app
  echo "Deployment success"
}

main
