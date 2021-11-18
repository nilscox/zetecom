#!/bin/bash

source $(dirname "$0")/functions.sh

environment=$1
shift

nobuild=""

usage() {
  echo "deploy website"
  echo
  echo "options:"
  echo "  --help      show this help"
  echo "  --nobuild   skip the build"
  echo
}

while [ "$1" != "" ]; do
    param=`echo $1 | awk -F= '{print $1}'`
    value=`echo $1 | awk -F= '{print $2}'`

    case $param in
        -h | --help)
            usage
            exit
            ;;
        --nobuild)
            nobuild="1"
            ;;
        *)
            echo "error: unknown parameter \"$param\""
            echo
            usage
            exit 1
            ;;
    esac
    shift
done

prepare_deployment() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ] && [ "$environment" != 'local' ]; then
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

  if [ -n "$deploy_key" ]; then
    execute ssh-add "$deploy_key"
  fi
}

cleanup_environment() {
  if [ -n "$deploy_key" ]; then
    execute ssh-add -d "$deploy_key"
  fi
}

build_website() {
  if [ -n "$nobuild" ]; then
    return
  fi

  execute NODE_ENV='production' yarn build
}

deploy_website() {
  # assert that the target directory is correct to avoid undesired upcoming `rm -rf`
  if ! ssh "$deploy_user@$deploy_host" ls "$website_dir" | grep charte.html > /dev/null; then
    cleanup_environment
    err "charte.html not found in $deploy_host:$website_dir, aborting deployment"
  fi

  execute ssh "$deploy_user@$deploy_host" rm -rf "$website_dir"
  execute scp -r dist "$deploy_user@$deploy_host:$website_dir"
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
