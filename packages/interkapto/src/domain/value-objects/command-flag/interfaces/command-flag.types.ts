import EmptyStringCommandFlagException from '../exceptions/empty-string-command-flag.exception';
import NonStringCommandFlagValueException from '../exceptions/non-string-command-flag-value.exception';
import NonStringCommandFlagException from '../exceptions/non-string-command-flag.exception';
import NotParsableCommandFlagValueException from '../exceptions/not-parseable-command-flag-value.exception';
import WhitespaceCommandFlagException from '../exceptions/whitespace-command-flag.exception';

export type CommandFlagExceptions =
    | EmptyStringCommandFlagException
    | NonStringCommandFlagValueException
    | NonStringCommandFlagException
    | NotParsableCommandFlagValueException
    | WhitespaceCommandFlagException

export interface CommandFlagDTO {
    flagName: string;
    flagValue?: string;
}
