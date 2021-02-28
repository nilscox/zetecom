#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

shift
command="$1"

prepare_deployment() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ] && [ "$environment" != 'local' ]; then
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
  echo_vars deploy_user deploy_host deploy_key app_image app_port

  if [ -n "$deploy_key" ]; then
    execute ssh-add "$deploy_key"
  fi
}

cleanup_environment() {
  if [ -n "$deploy_key" ]; then
    execute ssh-add -d "$deploy_key"
  fi
}

deploy_app() {
  execute ssh "$deploy_user@$deploy_host" docker pull "$app_image"
  execute ssh "$deploy_user@$deploy_host" docker rm -f "zc-app-$environment" || true

  ssh_args=""
  docker_args="-dt"

  if [ -n "$command" ]; then
    ssh_args="-tt"
    docker_args="-it"
  fi

  execute ssh "$ssh_args" "$deploy_user@$deploy_host" docker run "$docker_args" \
    --name "zc-app-$environment" \
    --network "zc-network-$environment" \
    -p "127.0.0.1:$app_port:80" \
    --volume "$base_dir/logs:/logs:rw" \
    --volume "$base_dir/avatars:/var/www/zc-app/avatars:ro" \
    --env NODE_ENV='production' \
    --env HOST='0.0.0.0' \
    --env PORT='80' \
    --env $(sshenv API_URL) \
    --env $(sshenv WEBSITE_URL) \
    --env $(sshenv ANALYTICS_PROVIDER) \
    --env $(sshenv ANALYTICS_URL) \
    --env $(sshenv ANALYTICS_SITE_ID) \
    --env $(sshenv SENTRY_DSN) \
    "$app_image" \
    "$command"
}

main() {
  echo_title "Deploy app"
  step "Prepare deployment" prepare_deployment
  step "Setup environment" setup_environment
  step "Deploy app" deploy_app
  step "Cleanup environment" cleanup_environment
  echo "Deployment success"
}

main
