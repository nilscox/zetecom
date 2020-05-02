set -e

reset='\033[0m'
green='\033[1;32m'
cyan='\033[1;36m'

err() {
  echo "$@" >&2
  exit 1
}

echo_n() {
  count="$1"
  chr="$2"

  for i in $(seq "$count"); do
    echo -n "$chr"
  done
}

echo_title() {
  title="$1"

  echo_n 80 "*"
  echo

  echo -n "**"
  echo_n $(((80 - "${#title}") / 2 - 2)) ' '
  echo -n "$title"
  echo_n $(((80 - "${#title}") / 2 - 2)) ' '
  echo -n "**"
  echo

  echo_n 80 "*"
  echo
  echo
}

echo_vars() {
  for var in $(echo "$@"); do
    echo "  - $var = '${!var}'"
  done
}

echo_env() {
  env_file="$1"
  env_file_path=$(env_path "$env_file")
  echo_vars $(cat "$env_file_path" | grep -v '^#\|^$' | sed 's/=.*//')
}

load_env() {
  env_file="$1"
  env_file_path=$(env_path "$env_file")

  echo "> source $env_file_path"
  source "$env_file_path"
}

env_path() {
  echo "$(dirname "$0")/env/$environment/$1"
}

sshenv() {
  var_name="$1"
  echo "$var_name=$'\'${!var_name}\''"
}

step() {
  step="$1"
  shift
  cmd="$@"

  echo -e "${cyan}* $step...${reset}"
  "$cmd"
  echo -e "${green}* $step success${reset}"
  echo
}

execute() {
  cmd="$@"

  echo "> $cmd"
  bash -c "$cmd"
}
