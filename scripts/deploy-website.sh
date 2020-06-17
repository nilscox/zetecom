#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

prepare_deployment() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ]; then
    err 'usage: deploy-website.sh [staging|production]'
  fi

  if ! grep '"name": "zetecom-website"' package.json > /dev/null 2>&1;  then
    err 'wrong directory'
  fi

  echo "Environment: $environment"
}

setup_environment () {
  load_env deploy.env
  set -a
  load_env website.env
  set +a
  echo

  echo "Environment variables:"
  echo_env website.env
  echo

  echo "Deployment variables:"
  echo_vars delpoy_key deploy_user deploy_host website_dir
}

build_website() {
  execute yarn clean
  execute NODE_ENV='production' yarn build --silent
}

deploy_website() {
  execute ssh-add "$deploy_key"

  # assert that the target directory is correct to avoid undesired upcoming `rm -rf`
  if ! ssh "$deploy_user@$deploy_host" ls "$website_dir" | grep charte.html > /dev/null; then
    execute ssh-add -d "$deploy_key"
    err "charte.html not found in $deploy_host:$website_dir, aborting deployment"
  fi

  execute ssh "$deploy_user@$deploy_host" rm -rf "$website_dir"
  execute scp -r dist "$deploy_user@$deploy_host:$website_dir"

  execute ssh-add -d "$deploy_key"
}

main() {
  echo_title "Deploy website"
  step "Prepare deployment" prepare_deployment
  step "Setup environment" setup_environment
  step "Build website" build_website
  step "Deploy website" deploy_website
  echo "Deployment success"
}

main
