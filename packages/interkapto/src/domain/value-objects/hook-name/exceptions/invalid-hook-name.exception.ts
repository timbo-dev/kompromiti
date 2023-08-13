import Exception from '@shared/exception/exception';

export default class InvalidHookNameException extends Exception {
    public constructor(invalidHookName: string) {
        super(
            `The provided hook name '${invalidHookName}'. is invalid for git\n` +
            'these is the allowed hook names:\n' +
            '\n' +
            'applypatch-msg\n' +
            'commit-msg\n' +
            'fsmonitor-watchman\n' +
            'post-update\n' +
            'pre-applypatch\n' +
            'pre-commit\n' +
            'pre-merge-commit\n' +
            'pre-push\n' +
            'pre-rebase\n' +
            'pre-receive\n' +
            'prepare-commit-msg\n' +
            'push-to-checkout\n' +
            'sendemail-validate\n' +
            'update\n' +
            'see git documentation for more information.'
        );
    }
}
