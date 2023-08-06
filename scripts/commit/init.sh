#!/bin/sh

init() {
    unikaConfig="[alias]\n\tunikamerge = \"!./scripts/commit/merge.sh\"\n\tunikainit = \"!./scripts/commit/init.sh\"\n\tunikaflow = \"!./scripts/commit/flow.sh\""

    if ! git show-ref --verify --quiet "refs/heads/develop"; then
        git checkout -b develop
    fi

    if [ $(git symbolic-ref --short HEAD) != "develop" ]; then
        git checkout develop
    fi

    if ! [[ "$(cat .git/config)" =~ "$(echo -e "$unikaConfig")" ]]; then
        echo -e "$unikaConfig" >> .git/config
    fi
}

init
