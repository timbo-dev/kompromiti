import { Either } from '@shared/either/either.type';
import err from '@shared/either/err';
import ok from '@shared/either/ok';
import AbstractValueObject from '@shared/value-object/value-object.abstract';

import EmptyStringHookNameException from './exceptions/empty-string-hook-name.exception';
import InvalidHookNameException from './exceptions/invalid-hook-name.exception';
import NonStringHookNameException from './exceptions/non-string-hook-name.exception';

import { GitHooks, HookNameExceptions } from './interfaces/hook-name.types';

export default class HookName extends AbstractValueObject {
    private static gitHooksList: Array<GitHooks> = [
        'applypatch-msg',
        'commit-msg',
        'fsmonitor-watchman',
        'post-update',
        'pre-applypatch',
        'pre-commit',
        'pre-merge-commit',
        'pre-push',
        'pre-rebase',
        'pre-receive',
        'prepare-commit-msg',
        'push-to-checkout',
        'sendemail-validate',
        'update'
    ];

    public static getHooksList(): Array<GitHooks> {
        return [...this.gitHooksList];
    }

    public constructor(
		private hookName: string
    ) {
        super();
    }

    public getName(): string {
        return this.hookName;
    }

    public static create(hookName: GitHooks): Either<HookNameExceptions, HookName> {
        const validationResult = HookName.validate(hookName);

        if (validationResult.isErr()) return err(validationResult.getValue());

        return ok(new HookName(hookName));
    }

    public static validate(value: GitHooks): Either<HookNameExceptions, GitHooks> {
        if (typeof value !== 'string')
            return err(new NonStringHookNameException(value));

        if (value.length === 0)
            return err(new EmptyStringHookNameException());

        if (!this.gitHooksList.includes(value))
            return err(new InvalidHookNameException(value));

        return ok(value);
    }
}
