import Hook from '@domain/hook/hook.entity';

import HookName from '@value-objects/hook-name/hook-name.entity';
import HookScript from '@value-objects/hook-script/hook-script.entity';

import EmptyStringHookNameException from '@value-objects/hook-name/exceptions/empty-string-hook-name.exception';
import InvalidHookNameException from '@value-objects/hook-name/exceptions/invalid-hook-name.exception';
import NonStringHookNameException from '@value-objects/hook-name/exceptions/non-string-hook-name.exception';
import NonStringHookScriptException from '@value-objects/hook-script/exceptions/non-string-hook-script.exception';

import { GitHooks } from '@value-objects/hook-name/interfaces/hook-name.types';
import { IStderr, IStdout } from '@value-objects/hook-script/interfaces/hook-script.types';

import { IHookDTO } from '../interfaces/hook.types';

describe('hook domain integration with value-objects flow tests', () => {
    const validScript =
        '#!/usr/bin/env sh\n' +
        'echo test\n';

    it('should create a hook', () => {
        const sut = Hook.create({
            hookName: 'pre-commit',
            hookScript: validScript
        });

        expect(sut.isOk()).toBe(true);
        expect(sut.isErr()).toBe(false);
        expect(sut.getValue()).toBeInstanceOf(Hook);

        const sutHook = (sut.getValue() as Hook);

        const sutHookName = sutHook.getHookName();
        const sutHookScript = sutHook.getHookScript();

        expect(sutHookName).toBeInstanceOf(HookName);
        expect(sutHookScript).toBeInstanceOf(HookScript);

        expect(sutHookName.getName()).toBe('pre-commit');
        expect(sutHookScript.getScript()).toBe(validScript);

        const sutHookExecutionResult = sutHook.execute();

        expect(sutHookExecutionResult.isOk()).toBe(true);
        expect(sutHookExecutionResult.isErr()).toBe(false);
        expect(sutHookExecutionResult.getValue()).toStrictEqual({
            returnCode: 0,
            stdout: 'test'
        } as IStdout);
    });

    test('invalid hook-name tests', () => {
        const sutNonStringHookName = Hook.create({
            hookName: undefined as GitHooks,
            hookScript: validScript
        });

        expect(sutNonStringHookName.isOk()).toBe(false);
        expect(sutNonStringHookName.isErr()).toBe(true);
        expect(sutNonStringHookName.getValue()).toBeInstanceOf(NonStringHookNameException);

        const sutEmptyStringHookName = Hook.create({
            hookName: '' as GitHooks,
            hookScript: validScript
        });

        expect(sutEmptyStringHookName.isOk()).toBe(false);
        expect(sutEmptyStringHookName.isErr()).toBe(true);
        expect(sutEmptyStringHookName.getValue()).toBeInstanceOf(EmptyStringHookNameException);

        const sutInvalidHookName = Hook.create({
            hookName: 'invalidHookName' as GitHooks,
            hookScript: validScript
        });

        expect(sutInvalidHookName.isOk()).toBe(false);
        expect(sutInvalidHookName.isErr()).toBe(true);
        expect(sutInvalidHookName.getValue()).toBeInstanceOf(InvalidHookNameException);
    });

    test('invalid hook-script tests and failed execution tests', () => {
        const sutNonStringHookScript = Hook.create({
            hookName: 'pre-commit',
            hookScript: undefined as string
        });

        expect(sutNonStringHookScript.isOk()).toBe(false);
        expect(sutNonStringHookScript.isErr()).toBe(true);
        expect(sutNonStringHookScript.getValue()).toBeInstanceOf(NonStringHookScriptException);

        const failureScript: IHookDTO = {
            hookName: 'pre-commit',
            hookScript:
                '#!/usr/bin/env sh\n' +
                'echo "test"\n' +
                'exit 1'
        };
        const sutFailureHookScript = Hook.create(failureScript);

        expect(sutFailureHookScript.isOk()).toBe(true);
        expect(sutFailureHookScript.isErr()).toBe(false);
        expect(sutFailureHookScript.getValue()).toBeInstanceOf(Hook);

        const sutFailureHookScriptValue = (sutFailureHookScript.getValue() as Hook).getHookScript();

        expect(sutFailureHookScriptValue).toBeInstanceOf(HookScript);
        expect(sutFailureHookScriptValue.getLineNumbers()).toBe(3);
        expect(sutFailureHookScriptValue.getScript()).toBe(failureScript.hookScript);

        const sutFailureExecutionResult = sutFailureHookScriptValue.execute();

        expect(sutFailureExecutionResult.isOk()).toBe(false);
        expect(sutFailureExecutionResult.isErr()).toBe(true);
        expect(sutFailureExecutionResult.getValue()).toStrictEqual({
            returnCode: 1,
            stderr: '',
            stdout: 'test'
        } as IStderr);
    });
});
