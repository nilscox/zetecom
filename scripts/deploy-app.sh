#!/usr/bin/env bash

dist="$1"
shift

if [ -z "$dist" ]; then
  echo "usage: deploy-app.sh <dist> [...options]" >&2
  exit 1
fi

deploy_host="localhost"
base_dir="$(pwd)/$(dirname "$0")/../data/zetecom-local"

while [ -n "$1" ]; do
  case "$1" in
    --deploy-host)
      deploy_host="$2"
      shift; shift;;

    --base-dir)
      base_dir="$2"
      shift; shift;;

    *)
      echo "warning: unkonwn argument \"$1\"" >&2
      shift;;
  esac
done

app_dir="$base_dir/app"

if ! ssh -v "$deploy_host" ls "$app_dir" | grep index.html > /dev/null; then
  echo "$deploy_host:$app_dir/index.html not found, aborting deployment" >&2
  exit 1
fi

ssh "$deploy_host" rm -rf "$app_dir"
scp -r "$dist" "$deploy_host:$app_dir"
