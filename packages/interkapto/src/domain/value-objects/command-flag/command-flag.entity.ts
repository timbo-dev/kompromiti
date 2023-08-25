import AbstractValueObject from '@shared/value-object/value-object.abstract';

import { Either } from '@shared/either/either.type';

import err from '@shared/either/err';
import ok from '@shared/either/ok';

import DuplicatedCommandFlagException from './exceptions/duplicated-command-flag.exception';
import EmptyStringCommandFlagException from './exceptions/empty-string-command-flag.exception';
import NonStringCommandFlagTypeException from './exceptions/non-string-command-flag-type.exception';
import NonStringCommandFlagValueException from './exceptions/non-string-command-flag-value.exception';
import NonStringCommandFlagException from './exceptions/non-string-command-flag.exception';
import NotMatchCommandFlagTypeException from './exceptions/not-match-command-flag-type.exception';
import NotParsableCommandFlagValueException from './exceptions/not-parseable-command-flag-value.exception';
import WhitespaceCommandFlagException from './exceptions/whitespace-command-flag.exception';

import { CommandFlagExceptions, FlagTypes, ICommandFlagDTO, ParseType } from './interfaces/command-flag.types';

export default class CommandFlag<T extends FlagTypes> extends AbstractValueObject {
    public constructor(
        private flagName: string,
        private flagValue: ParseType<T>,
        private flagType: T
    ) {
        super();
        Object.freeze(this);
    }

    private static flagTypes = [
        'string',
        'boolean',
        'number',
        'array',
        'object',
        'null',
        'undefined'
    ] as const;

    public static getFlagTypes() {
        return [...this.flagTypes];
    }

    public getFlagName(): string {
        return this.flagName;
    }

    public getFlagType(): T {
        return this.flagType;
    }

    public getFlagValue() {
        return this.flagValue;
    }

    public static create<T extends FlagTypes>({ flagName, flagValue = 'null', flagType }: ICommandFlagDTO<T>): Either<CommandFlagExceptions, CommandFlag<T>> {
        const validationResult = this.validate({
            flagName,
            flagValue,
            flagType
        });

        if (validationResult.isErr())
            return err(validationResult.getValue());

        const parseResult = this.parse<ParseType<T>>(flagValue);

        if (parseResult.isErr())
            return err(parseResult.getValue());

        return ok(new CommandFlag(
            flagName,
            parseResult.getValue(),
            flagType
        ));
    }

    public static parse<T>(flagValue: string): Either<CommandFlagExceptions, T> {
        try {
            return ok(JSON.parse(flagValue));
        } catch(e) {
            try {
                return ok(JSON.parse(`"${flagValue}"`));
            } catch(e) {
                return err(new NotParsableCommandFlagValueException(flagValue));
            }
        }
    }

    public static validate<T extends FlagTypes>({ flagName, flagValue, flagType }: ICommandFlagDTO<T>): Either<CommandFlagExceptions, ICommandFlagDTO<T>> {
        if (typeof flagName !== 'string')
            return err(new NonStringCommandFlagException(flagName));

        if (flagName.length === 0)
            return err(new EmptyStringCommandFlagException());

        if (/\s/g.test(flagName))
            return err(new WhitespaceCommandFlagException(flagName));

        if (typeof flagValue !== 'string')
            return err(new NonStringCommandFlagValueException(flagValue));

        if (typeof flagType !== 'string')
            return err(new NonStringCommandFlagTypeException(flagType));

        if (!this.flagTypes.includes(flagType))
            return err(new NotMatchCommandFlagTypeException(flagType));

        return ok({
            flagName,
            flagValue,
            flagType
        });
    }
}
