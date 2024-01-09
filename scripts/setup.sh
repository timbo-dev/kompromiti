#!/usr/bin/env bash

readonly GREEN='\x1b[32m'
readonly YELLOW='\x1b[33m'
readonly RED='\x1b[31m'
readonly RESET='\x1b[0m'

apply_flow_alias() {
    readonly git_config_path="./.git/config"
    readonly flow_alias="$(cat './scripts/alias.txt')"

    if [ ! -f "$git_config_path" ]; then
        echo -e "${RED}Error: \"$git_config_path\" file not found${RESET}"
    fi

    if [[ $(cat "$git_config_path") =~ "$flow_alias" ]]; then
        echo -e "${YELLOW}Warning: flow alias already exists on $git_config_path.${RESET}"
        return
    fi

    echo -e "$flow_alias" >> "$git_config_path"
    echo -e "${GREEN}Success: flow alias applied${RESET}"
}

apply_flow_alias
