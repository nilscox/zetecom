#!/bin/sh

scripts=$(dirname "$0")
repo=$(realpath "$scripts/..")
source "$scripts/functions.sh"
environment=$1

prepare_dump() {
  if [ "$environment" != 'production' ] && [ "$environment" != 'staging' ]; then
    err 'usage: dump-database.sh [staging|production]'
  fi

  echo "Environment: $environment"
}

setup_environment () {
  load_env deploy.env
  load_env api.env
  echo

  echo "Dump variables:"
  echo_vars deploy_user deploy_host base_dir DB_NAME
}

dump_database() {
  dumpfile="$repo/data/dumps/dump-$environment-$(date +%Y-%m-%d-%H:%M:%S).sql"
  container_remote="zc-postgres-$environment"
  container_local="zc-postgres"

  mkdir -p $(dirname "$dumpfile")

  execute ssh-add "$deploy_key"
  dump=$(ssh -i "$deploy_key" -tt "$deploy_user@$deploy_host" docker exec "$container_remote" pg_dump -U "$DB_USER" "$DB_NAME")
  execute ssh-add -d "$deploy_key"

  echo "$dump" | tee "$dumpfile" | docker exec -i "$container_local" psql db
  echo "Dump saved in $dumpfile"
}

main() {
  echo_title "Dump database"
  step "Prepare dump" prepare_dump
  step "Setup environment" setup_environment
  step "Dump database" dump_database
  echo "Dump success"
}

main
