import AbstractValueObject from '@shared/value-object/value-object.abstract';

import { Either } from '@shared/either/either.type';

import err from '@shared/either/err';
import ok from '@shared/either/ok';

import EmptyStringCommandNameException from './exceptions/empty-string-command-name.exception';
import NonStringCommandNameException from './exceptions/non-string-command-name.exception';
import WhitespaceCommandNameException from './exceptions/whitespace-command-name.exception';

import { CommandNameExceptions } from './interfaces/command-name.types';

export default class CommandName extends AbstractValueObject {
    private constructor(
		private commandName: string
    ) {
        super();
        Object.freeze(this);
    }

    public getName(): string {
        return this.commandName;
    }

    public static create(commandName: string): Either<CommandNameExceptions, CommandName> {
        const validationResult = this.validate(commandName);

        if (validationResult.isErr())
            return err(validationResult.getValue());

        return ok(new CommandName(commandName));
    }

    public static validate(commandName: string): Either<CommandNameExceptions, string> {
        if (typeof commandName !== 'string')
            return err(new NonStringCommandNameException(commandName));

        if (commandName.length === 0)
            return err(new EmptyStringCommandNameException());

        if (/\s/g.test(commandName))
            return err(new WhitespaceCommandNameException(commandName));

        return ok(commandName);
    }
}
