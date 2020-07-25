#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

replace_vars_in_manifest() {
  manifest="$1"

  if [ "$environment" == 'staging' ]; then
    app_name='Zétécom (staging)'
    app_url='https://app-staging.zetecom.fr'
    extension_id='{e84db867-422d-4f5b-ab2a-8ea81ca80e9d}'
    extension_update_url='https://staging.zetecom.fr/updates.json'
  elif [ "$environment" == 'production' ]; then
    app_name='Zétécom'
    app_url='https://app.zetecom.fr'
    extension_id='{f61fdab5-2cd8-4a50-cafe-ea16642b2fa3}'
  fi

  node -e "
    const fs = require('fs');
    const manifest = require('$manifest');

    manifest.name = '$app_name';
    manifest.browser_specific_settings.gecko.id = '$extension_id';

    if ('$extension_update_url' !== '')
      manifest.browser_specific_settings.gecko.update_url = '$extension_update_url';

    fs.writeFileSync('$manifest', JSON.stringify(manifest, null, 2));
  "
}

sources_zip_filename="zetecom-extension-$environment-sources-$(package_version ./package.json).zip"
zip_filename="zetecom-extension-$environment-$(package_version ./package.json).zip"

create_source_archive() {
  tmp_dir=$(mktemp -d)
  tmp_extension_dir="$tmp_dir/extension"

  git clone .. "$tmp_dir"

  replace_vars_in_manifest "$tmp_extension_dir/manifest.json"
  echo APP_URL="$app_url" > "$tmp_extension_dir/.env"
  zip_directory "./$sources_zip_filename" "$tmp_extension_dir"

  rm -rf "$tmp_dir"
}

build_extension_from_sources() {
  tmp_dir=$(mktemp -d)

  unzip "$sources_zip_filename" -d "$tmp_dir"

  (cd "$tmp_dir" && yarn && yarn build)
  zip_directory "./$zip_filename" "$tmp_dir/dist"

  rm -rf "$tmp_dir"
}

main() {
  if [ "$environment" != 'staging' ] && [ "$environment" != 'production' ]; then
    err "usage: build-extension.ci.sh [staging|production]"
  fi

  echo "Build extension in environment: $environment"
  create_source_archive
  build_extension_from_sources
}

main
