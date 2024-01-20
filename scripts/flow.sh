#!/bin/sh

start() {
    local name=$1
    local target=$2
    local base="${3:-develop}"

    if [ $base == '.' ]; then
        base=$(git rev-parse --abbrev-ref HEAD)
    fi

    if ! git show-ref --verify --quiet "refs/heads/$base"; then
        echo "error: the provided base $base branch not exists."
        exit 1
    fi

    if ! git show-ref --verify --quiet "refs/heads/$name/$target"; then
        git checkout -b $name/$target $base
    else
        echo "error: the provided $name branch already exist"
        exit 1
    fi
}

finish() {
    local name=$1
    local target=$2

    if ! git show-ref --verify --quiet "refs/heads/$name/$target"; then
        echo "error: the provided branch '$name/$target' does not exist."
        exit 1
    else
        actualCommits=$(git log --no-merges --format=format:'%s' develop..$name/$target)
        if [ -z "$actualCommits" ]; then
            echo "error: you cannot finish an unmodified branch"
            exit 1
        fi
        git checkout develop
        git unikamerge $name/$target
        git branch -D $name/$target
    fi
}

needBranchName() {
    local name=$1

    if [ -z "$name" ]; then
        echo "error: you need to provide a branch name"
        exit 1
    fi
}

commandNotProvided() {
    local command=$1
    local name=$2

    if [ -z "$command" ]; then
        echo "error: the flow $name command does not been provided."
        exit 1
    fi

    echo "Command '$command' not found"

    exit 1
}

feature() {
    local command=$1

    case "$command" in
        start|s)
            shift

            needBranchName $1
            start feature $@
            break
        ;;
        finish|f)
            shift

            needBranchName $1
            finish feature $@

            break
        ;;

        *)
            echo "error"
        ;;
    esac
}

chore() {
    local command=$1

    case "$command" in
        start|s)
            shift

            needBranchName $1
            start chore $@
            break
        ;;
        finish|f)
            shift

            needBranchName $1
            finish chore $@

            break
        ;;

        *)
            echo "error"
        ;;
    esac
}

bugfix() {
    local command=$1

    case "$command" in
        start|s)
            shift

            needBranchName $1
            start bugfix $@
            break
        ;;
        finish|f)
            shift

            needBranchName $1
            finish bugfix $@

            break
        ;;

        *)
            echo "error"
        ;;
    esac
}

hotfix() {
    local command=$1

    case "$command" in
        start|s)
            shift

            needBranchName $1
            start hotfix $@
            break
        ;;
        finish|f)
            shift

            needBranchName $1
            finish hotfix $@

            break
        ;;

        *)
            echo "error"
        ;;
    esac
}

refactor() {
    local command=$1

    case "$command" in
        start|s)
            shift

            needBranchName $1
            start refactor $@
            break
        ;;
        finish|f)
            shift

            needBranchName $1
            finish refactor $@

            break
        ;;

        *)
            echo "error"
        ;;
    esac
}

perf() {
    local command=$1

    case "$command" in
        start|s)
            shift

            needBranchName $1
            start perf $@
            break
        ;;
        finish|f)
            shift

            needBranchName $1
            finish perf $@

            break
        ;;

        *)
            echo "error"
        ;;
    esac
}

release() {
    local command=$1

    start() {
        local release=$1

        if ! git show-ref --verify --quiet "refs/heads/release/$release"; then
            git checkout -b release/$release develop
        else
            echo "error: the provided release branch already exist"
            exit 1
        fi
    }

    finish() {
        local target=$1
        local FORCE_MODE=$2

        if ! git show-ref --verify --quiet "refs/heads/release/$target"; then
            echo "error: the provided branch 'release/$target' does not exist."
            exit 1
        else
            if [ "$FORCE_MODE" == '--force' ]; then
                echo
                git commit -m "🔖 release: add tag $target" --allow-empty
            else
                git commit -m "🔖 release: add tag $target"

                if [ $? == 1 ]; then
                    echo "error: please modify your version files"
                    echo "or use --force to skip this verification"
                    exit 1
                fi
            fi

            local last_commit_sha1=$(git rev-parse HEAD)

            tag() {
                targetBranch=$1
                target=$2

                if [ -z "$targetBranch" ]; then
                    echo "error: the target branch does not been provided"
                    exit 1
                fi

                actualBranch=$(git symbolic-ref --short HEAD)
                actualCommits=$(git log --no-merges --format=format:'%s' $targetBranch..$actualBranch)

                printf '🔖 release: add tag %s\n' $target
                echo ''

                if [ ! -z "$actualCommits" ]; then
                    printf 'Release %s changelog:\n' $target
                    echo ''
                    echo "$actualCommits"
                    echo ''
                fi
            }

            tag_message=$(tag main $target)

            git tag -a $target -m "$tag_message" $last_commit_sha1

            git checkout develop
            git unikamerge release/$target
            git checkout main
            git unikamerge release/$target

            git branch -D release/$target
            git checkout develop
            git push --tags
            git push origin develop
            git push origin main
        fi
    }

    case "$command" in
        start|s)
            shift

            if [ -z "$1" ]; then
                echo "error: you need to provide a branch name"
                exit 1
            fi

            start $@

            break
        ;;
        finish|f)
            shift

            if [ -z "$1" ]; then
                echo "error: you need to provide a branch name"
                exit 1
            fi

            finish $@

            break
        ;;
        *)
            if [ -z "$command" ]; then
                echo "error: the flow feature command does not been provided."
                exit 1
            fi
            echo "Command '$command' not found"
            exit 1
        ;;
    esac

}

flow() {
    local command=$1

    case "$command" in
        feature|f)
            shift
            feature $@
            break
        ;;
        chore|c)
            shift
            chore $@
            break
        ;;
        bugfix|fix|fx)
            shift
            bugfix $@
            break
        ;;
        release|r)
            shift
            release $@
            break
        ;;
        hotfix|h)
            shift
            hotfix $@
            break
        ;;
        *)
            if [ -z "$command" ]; then
                echo "error: the flow command does not been provided."
                exit 1
            fi
            echo "Command '$command' not found"
            exit 1
        ;;
    esac

}

flow $@
