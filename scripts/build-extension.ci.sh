#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

replace_name_in_manifest() {
  manifest="$1"

  if [ "$environment" == 'staging' ]; then
    sed -i $'s/"name": "Réagir à l\'information"/"name": "Réagir à l\'information (staging)"/' $manifest
  fi
}

build_extension() {
  zip_filename="reagir-information-extension-$environment-$(package_version ./package.json).zip"

  yarn clean
  NODE_ENV='production' yarn build --silent
  replace_name_in_manifest dist/manifest.json
  zip_directory "./$zip_filename" dist
}

create_source_archive() {
  tmp_dir=$(mktemp -d)
  extension_dir="$tmp_dir/extension"
  zip_filename="reagir-information-extension-$environment-sources-$(package_version ./package.json).zip"

  git clone "$(realpath $(dirname $0)/..)" "$tmp_dir"

  echo APP_URL="$APP_URL" > "$extension_dir/.env"
  replace_name_in_manifest "$extension_dir/manifest.json"
  zip_directory "./$zip_filename" "$extension_dir"
  rm -rf "$tmp_dir"
}

main() {
  if [ -z "$APP_URL" ]; then
    err "Environment variable APP_URL is not set"
  fi

  echo "Build extension in environment: $environment"
  build_extension
  create_source_archive
}

main
