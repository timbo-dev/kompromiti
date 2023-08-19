import AbstractValueObject from '@shared/value-object/value-object.abstract';

import { Either } from '@shared/either/either.type';

import Exception from '@shared/exception/exception';

import err from '@shared/either/err';
import ok from '@shared/either/ok';

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
            return err(new Exception('Description is a non-string type'));

        if (description.length === 0)
            return err(new Exception('Description is empty'));

        return ok(description);
    }
}
