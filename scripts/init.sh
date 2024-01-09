#!/bin/sh

init() {
    if ! git show-ref --verify --quiet "refs/heads/develop"; then
        git checkout -b develop
    fi

    if [ $(git symbolic-ref --short HEAD) != "develop" ]; then
        git checkout develop
    fi
}

init
