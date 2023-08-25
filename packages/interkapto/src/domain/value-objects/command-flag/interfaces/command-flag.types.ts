import EmptyStringCommandFlagException from '../exceptions/empty-string-command-flag.exception';
import NonStringCommandFlagValueException from '../exceptions/non-string-command-flag-value.exception';
import NonStringCommandFlagException from '../exceptions/non-string-command-flag.exception';
import NotMatchCommandFlagTypeException from '../exceptions/not-match-command-flag-type.exception';
import NotParsableCommandFlagValueException from '../exceptions/not-parseable-command-flag-value.exception';
import WhitespaceCommandFlagException from '../exceptions/whitespace-command-flag.exception';

export type CommandFlagExceptions =
    | EmptyStringCommandFlagException
    | NonStringCommandFlagValueException
    | NonStringCommandFlagException
    | NotParsableCommandFlagValueException
    | WhitespaceCommandFlagException
    | NotMatchCommandFlagTypeException

export interface ICommandFlagDTO<T extends FlagTypes> {
    flagType: T;
    flagValue?: string;
    flagName: string;
}

export type FlagTypes =
    | 'string'
    | 'boolean'
    | 'number'
    | 'array'
    | 'object'
    | 'null'
    | 'undefined'

export type ParseType<T extends FlagTypes = 'string', P = unknown> =
    T extends 'string' ? string :
    T extends 'boolean' ? boolean :
    T extends 'number' ? number :
    T extends 'array' ? Array<P> :
    T extends 'object' ? P :
    T extends 'null' ? null :
    T extends 'undefined' ? undefined :
    unknown
