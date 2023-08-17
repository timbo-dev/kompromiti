import cp from 'child_process';

import { IExecuteSyncError } from '@domain/hook/interfaces/hook.types';

import { Either } from '@shared/either/either.type';
import err from '@shared/either/err';
import ok from '@shared/either/ok';
import AbstractValueObject from '@shared/value-object/value-object.abstract';

import NonStringHookScriptException from './exceptions/non-string-hook-script.exception';

import { HookScriptExceptions, IStderr, IStdout } from './interfaces/hook-script.types';

export default class HookScript extends AbstractValueObject {
    private constructor(
        private script: string
    ) {
        super();
        Object.freeze(this);
    }

    public getScript(): string {
        return this.script;
    }

    public getLineNumbers(): number {
        return this.script.match(/\n/g).length + 1;
    }

    public execute(): Either<IStderr, IStdout> {
        try {
            const scriptBufferResult = cp.execSync(this.script);
            const codeBufferResult = cp.execSync('echo $?');

            const stdout = this.removeEndLineFeed(scriptBufferResult.toString());
            const returnCode = +this.removeEndLineFeed(codeBufferResult.toString());

            return ok<IStdout>({
                stdout,
                returnCode
            });
        } catch(error) {
            const execSyncError = error as IExecuteSyncError;
            const returnCode = execSyncError.status;

            const stdout = this.removeEndLineFeed(execSyncError.stdout.toString());
            const stderr = this.removeEndLineFeed(execSyncError.stderr.toString());

            return err<IStderr>({
                returnCode,
                stderr,
                stdout
            });
        }
    }

    private removeEndLineFeed(message: string): string {
        return message.slice(0, -1);
    }

    public static create(script: string): Either<HookScriptExceptions, HookScript> {
        const validationResult = HookScript.validate(script);

        if (validationResult.isErr()) return err(validationResult.getValue());

        return ok(new HookScript(script));
    }

    public static validate(script: string): Either<HookScriptExceptions, string> {
        if (typeof script !== 'string')
            return err(new NonStringHookScriptException(script));

        return ok(script);
    }
}
