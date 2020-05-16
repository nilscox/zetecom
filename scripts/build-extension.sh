#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

replace_name_in_manifest() {
  manifest="$1"

  if [ "$environment" == 'staging' ]; then
    sed_cmd=$'s/"name": "Réagir à l\\\'information"/"name": "Réagir à l\\\'information (staging)"/'
    execute "sed -i $'$sed_cmd' $manifest"
  fi
}

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
  zip_filename="reagir-information-extension-$environment-$(package_version ./package.json).zip"

  execute yarn clean
  execute NODE_ENV='production' yarn build --silent
  replace_name_in_manifest dist/manifest.json
  zip_directory "./$zip_filename" dist
}

create_source_archive() {
  tmp_dir=$(mktemp -d)
  extension_dir="$tmp_dir/extension"
  zip_filename="reagir-information-extension-$environment-sources-$(package_version ./package.json).zip"

  execute git clone "$(realpath $(dirname $0)/..)" "$tmp_dir"

  execute cp $(env_path extension.env) "$extension_dir/.env"
  replace_name_in_manifest "$extension_dir/manifest.json"
  zip_directory "./$zip_filename" "$extension_dir"
  execute rm -rf "$tmp_dir"
}

main() {
  echo_title "Build extension"
  step "Prepare build" prepare_build
  step "Setup environment" setup_environment
  step "Build extension" build_extension
  step "Create sources archive" create_source_archive
  echo "Build success"
}

main
