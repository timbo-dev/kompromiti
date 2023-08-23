import AbstractValueObject from '@shared/value-object/value-object.abstract';

import { Either } from '@shared/either/either.type';

import Exception from '@shared/exception/exception';

import err from '@shared/either/err';
import ok from '@shared/either/ok';

import { CommandFlagDTO, CommandFlagExceptions } from './interfaces/command-flag.types';

export default class CommandFlag<T> extends AbstractValueObject {
    public constructor(
        private flagName: string,
        private flagValue: T = null
    ) {
        super();
        Object.freeze(this);
    }

    public getFlagName(): string {
        return this.flagName;
    }

    public getFlagValue(): T {
        return this.flagValue;
    }

    public static create<T>({ flagName, flagValue = 'null' }: CommandFlagDTO): Either<CommandFlagExceptions, CommandFlag<T>> {
        const validationResult = this.validate({
            flagName,
            flagValue
        });

        if (validationResult.isErr())
            return err(validationResult.getValue());

        const parseResult = this.parse<T>(flagValue);

        if (parseResult.isErr())
            return err(parseResult.getValue());

        return ok(new CommandFlag(flagName, parseResult.getValue()));
    }

    public static parse<T>(flagValue: string): Either<CommandFlagExceptions, T> {
        try {
            return ok(JSON.parse(flagValue));
        } catch(e) {
            try {
                return ok(JSON.parse(`"${flagValue}"`));
            } catch(e) {
                return err(new Exception('Failed to parse flag value.'));
            }
        }
    }

    public static validate({ flagName, flagValue }: CommandFlagDTO): Either<CommandFlagExceptions, CommandFlagDTO> {
        return ok({
            flagName,
            flagValue
        });
    }
}
