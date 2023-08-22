import AbstractValueObject from '@shared/value-object/value-object.abstract';

import { Either } from '@shared/either/either.type';

import err from '@shared/either/err';
import ok from '@shared/either/ok';

import EmptyStringCommandAliasException from './exceptions/empty-string-command-alias.exception';
import NonStringCommandAliasException from './exceptions/non-string-command-alias.exception';

import { CommandAliasExceptions } from './interfaces/command-alias.types';

export default class CommandAlias extends AbstractValueObject {
    public constructor(
        private alias: string
    ) {
        super();
        Object.freeze(this);
    }

    public getAlias(): string {
        return this.alias;
    }

    public static create(alias: string): Either<CommandAliasExceptions, CommandAlias> {
        const validationResult = this.validate(alias);

        if (validationResult.isErr())
            return err(validationResult.getValue());

        return ok(new CommandAlias(alias));
    }

    public static validate(alias: string): Either<CommandAliasExceptions, string> {
        if (typeof alias !== 'string')
            return err(new NonStringCommandAliasException(alias));

        if (alias.length === 0)
            return err(new EmptyStringCommandAliasException());

        return ok(alias);
    }
}
