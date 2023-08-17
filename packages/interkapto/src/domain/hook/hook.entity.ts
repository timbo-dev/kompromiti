import { IStderr, IStdout } from '@domain/value-objects/hook-script/interfaces/hook-script.types';

import HookName from '@value-objects/hook-name/hook-name.entity';
import HookScript from '@value-objects/hook-script/hook-script.entity';

import { Either } from '@shared/either/either.type';
import err from '@shared/either/err';
import ok from '@shared/either/ok';

import { HookExceptions, IHookDTO } from './interfaces/hook.types';

export default class Hook {
    private constructor(
        private hookName: HookName,
        private hookScript: HookScript
    ) {}

    public getHookName(): HookName {
        return this.hookName;
    }

    public getHookScript(): HookScript {
        return this.hookScript;
    }

    public static create(props: IHookDTO): Either<HookExceptions, Hook> {
        const hookNameResult = HookName.create(props.hookName);
        const hookScriptResult = HookScript.create(props.hookScript);

        if (hookNameResult.isErr()) return err(hookNameResult.getValue());
        if (hookScriptResult.isErr()) return err(hookScriptResult.getValue());

        return ok(new Hook(
            hookNameResult.getValue(),
            hookScriptResult.getValue()
        ));
    }

    public execute(): Either<IStderr, IStdout> {
        return this.hookScript.execute();
    }
}
