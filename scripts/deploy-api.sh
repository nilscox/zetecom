#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

shift
command="$1"

prepare_deployment() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ] && [ "$environment" != 'local' ]; then
    echo 'usage: deploy-api.sh [staging|production]' >&2
    exit 1
  fi

  echo "Environment: $environment"
}

setup_environment () {
  load_env deploy.env
  load_env api.env
  echo

  echo "Environment variables:"
  echo_env api.env
  echo

  echo "Deployment variables:"
  echo_vars deploy_user deploy_host deploy_key base_dir api_image api_port

  if [ -n "$deploy_key" ]; then
    execute ssh-add "$deploy_key"
  fi
}

cleanup_environment() {
  if [ -n "$deploy_key" ]; then
    execute ssh-add -d "$deploy_key"
  fi
}

deploy_api() {
  execute ssh "$deploy_user@$deploy_host" docker pull "$api_image"
  ssh "$deploy_user@$deploy_host" docker rm -f "zc-api-$environment" || true

  ssh_args=""
  docker_args="-dt"

  if [ -n "$command" ]; then
    ssh_args="-tt"
    docker_args="-it"
  fi

  execute ssh "$ssh_args" "$deploy_user@$deploy_host" docker run "$docker_args" \
    --name "zc-api-$environment" \
    --network "zc-network-$environment" \
    --volume "$base_dir/avatars:/app/avatars:rw" \
    -p "127.0.0.1:$api_port:80" \
    --env LISTEN_IP='0.0.0.0' \
    --env LISTEN_PORT='80' \
    --env $(sshenv LOG_LEVEL) \
    --env $(sshenv TRUST_PROXY) \
    --env $(sshenv REFLECT_ORIGIN) \
    --env $(sshenv BYPASS_AUTHORIZATIONS) \
    --env $(sshenv ADMIN_USER) \
    --env $(sshenv APP_URL) \
    --env $(sshenv WEBSITE_URL) \
    --env $(sshenv DB_HOST) \
    --env $(sshenv DB_PORT) \
    --env $(sshenv DB_USER) \
    --env $(sshenv DB_PASS) \
    --env $(sshenv DB_NAME) \
    --env $(sshenv DB_ENTITIES) \
    --env $(sshenv DB_MIGRATIONS) \
    --env $(sshenv DB_SEEDS) \
    --env $(sshenv REDIS_HOST) \
    --env $(sshenv REDIS_PORT) \
    --env $(sshenv EMAIL_HOST) \
    --env $(sshenv EMAIL_PORT) \
    --env $(sshenv EMAIL_USER) \
    --env $(sshenv EMAIL_PASSWORD) \
    --env $(sshenv EMAIL_SECURE) \
    --env $(sshenv EMAIL_BYPASS) \
    --env $(sshenv EMAIL_ACCOUNT_VERIFICATION) \
    --env $(sshenv EMAIL_FROM) \
    --env $(sshenv SESSION_SECRET) \
    --env $(sshenv SECURE_COOKIE) \
    --env $(sshenv USER_AVATAR_DESTINATION) \
    "$api_image" \
    "$command"
}

main() {
  echo_title "Deploy API"
  step "Prepare deployment" prepare_deployment
  step "Setup environment" setup_environment
  step "Deploy API" deploy_api
  step "Cleanup environment" cleanup_environment
  echo "Deployment success"
}

main
