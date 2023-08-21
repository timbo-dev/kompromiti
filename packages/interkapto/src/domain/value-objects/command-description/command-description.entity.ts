import AbstractValueObject from '@shared/value-object/value-object.abstract';

import { Either } from '@shared/either/either.type';

import err from '@shared/either/err';
import ok from '@shared/either/ok';

import EmptyStringCommandDescriptionException from './exceptions/empty-string-command-description.exception';
import NonStringCommandDescriptionException from './exceptions/non-string-command-description.exception';

import { CommandDescriptionExceptions } from './interfaces/command-description.types';

export default class CommandDescription extends AbstractValueObject {
    public constructor(
        private description: string
    ) {
        super();
        Object.freeze(this);
    }

    public getDescription(): string {
        return this.description;
    }

    public static create(description: string): Either<CommandDescriptionExceptions, CommandDescription> {
        const validationResult = this.validate(description);

        if (validationResult.isErr())
            return err(validationResult.getValue());

        return ok(new CommandDescription(description));
    }

    public static validate(description: string): Either<CommandDescriptionExceptions, string> {
        if (typeof description !== 'string')
            return err(new NonStringCommandDescriptionException(description));

        if (description.length === 0)
            return err(new EmptyStringCommandDescriptionException());

        return ok(description);
    }
}
