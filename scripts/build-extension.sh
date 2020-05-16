#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

prepare_build() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ]; then
    err 'usage: build-extension.sh [staging|production]'
  fi

  if ! grep '"name": "reagir-information-extension"' package.json > /dev/null 2>&1;  then
    err 'wrong directory'
  fi

  echo "Environment: $environment"
}

setup_environment () {
  set -a
  load_env extension.env
  set +a
  echo

  echo "Environment variable:"
  echo_env extension.env
  echo
}

build_extension() {
  execute yarn clean
  execute NODE_ENV='production' yarn build --silent

  if [ "$environment" == 'staging' ]; then
    sed -i $'s/"name": "Réagir à l\'information"/"name": "Réagir à l\'information (staging)"/' dist/manifest.json
  fi

  execute yarn zip
}

main() {
  echo_title "Build extension"
  step "Prepare build" prepare_build
  step "Setup environment" setup_environment
  step "Build extension" build_extension
  echo "Build success"
}

main
