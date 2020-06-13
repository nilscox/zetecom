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
  db_remote="zc-postgres-$environment"
  db_local="zc-postgres"

  mkdir -p $(dirname "$dumpfile")

  dump=$(ssh -tt "$deploy_user@$deploy_host" docker exec "$db_remote" pg_dump "$DB_NAME")
  echo "$dump" | tee "$dumpfile" | docker exec -i "$db_local" psql "$DB_NAME" >/dev/null
  echo "Dump saved in $dumpfile"
}

mount_avatars() {
  avatars="$repo/app/public/avatars"

  fusermount3 -u "$avatars" > /dev/null 2>&1 || true
  execute sshfs "$deploy_host:$base_dir/avatars" "$avatars"
}

main() {
  echo_title "Dump database"
  step "Prepare dump" prepare_dump
  step "Setup environment" setup_environment
  step "Dump database" dump_database
  step "Mount avatars" mount_avatars
  echo "Dump success"
}

main
