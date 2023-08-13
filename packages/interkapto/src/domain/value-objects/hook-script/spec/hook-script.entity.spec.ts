import NonStringHookScriptException from '../exceptions/non-string-hook-script.exception';

import HookScript from '../hook-script.entity';
import { IStdout } from '../interfaces/hook-script.types';

describe('hook-script value-object entity tests', () => {
    const validScript =
        '#!/usr/bin/env sh\n' +
        'echo "test"';

    it('should create a hook script', () => {
        const sut = HookScript.create(validScript);

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(HookScript);
    });

    it('should not create a hook script if the provided value is a non string value', () => {
        const nonStringValue = undefined as unknown as string;
        const sut = HookScript.create(nonStringValue);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringHookScriptException);
    });

    it('should get a hook script line numbers', () => {
        const sut = HookScript.create(validScript);
        const sutScript = (sut.getValue() as HookScript);

        expect(sutScript.getLineNumbers()).toBe(2);
    });

    it('should execute a hook script', () => {
        const sut = HookScript.create(validScript);
        const sutScript = (sut.getValue() as HookScript);

        const executeResult = sutScript.execute();

        expect(executeResult.isOk()).toBe(true);
        expect(executeResult.getValue()).toStrictEqual({
            returnCode: 0,
            stdout: 'test'
        } as IStdout);
    });
});
