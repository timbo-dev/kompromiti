import EmptyStringHookNameException from '../exceptions/empty-string-hook-name.exception';
import InvalidHookNameException from '../exceptions/invalid-hook-name.exception';
import NonStringHookNameException from '../exceptions/non-string-hook-name.exception';

import HookName from '../hook-name.entity';
import { GitHooks } from '../interfaces/hook-name.types';

describe('hook-name value-object entity tests', () => {
    it('should create a valid hook-name', () => {
        const sut = HookName.create('commit-msg');
        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(HookName);

        const sutName = (sut.getValue() as HookName).getName();
        expect(sutName).toBe('commit-msg');
    });

    it('should return an exception if hook-name not exist on git', () => {
        const sut = HookName.create('invalid' as GitHooks);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(InvalidHookNameException);
    });

    it('should return an exception if the provided argument is not string type', () => {
        const notStringValue = undefined as unknown as GitHooks;
        const sut = HookName.create(notStringValue);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringHookNameException);
    });

    it('should return an exception if the provided argument is an empty string', () => {
        const emptyStringValue = '' as GitHooks;
        const sut = HookName.create(emptyStringValue);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(EmptyStringHookNameException);
    });

    it('should get hooks list', () => {
        const hooksList = [
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

        expect(HookName.getHooksList()).toStrictEqual(hooksList);
    });
});
