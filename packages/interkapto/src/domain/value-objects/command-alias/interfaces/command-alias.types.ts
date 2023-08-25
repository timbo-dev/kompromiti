import EmptyStringCommandAliasException from '../exceptions/empty-string-command-alias.exception';
import NonStringCommandAliasException from '../exceptions/non-string-command-alias.exception';
import WhitespaceCommandAliasException from '../exceptions/whitespace-command-alias.exception';

export type CommandAliasExceptions =
    | EmptyStringCommandAliasException
    | NonStringCommandAliasException
    | WhitespaceCommandAliasException
