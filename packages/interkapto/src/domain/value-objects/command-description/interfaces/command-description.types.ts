import EmptyStringCommandDescriptionException from '../exceptions/empty-string-command-description.exception';
import NonStringCommandDescriptionException from '../exceptions/non-string-command-description.exception';

export type CommandDescriptionExceptions =
    | NonStringCommandDescriptionException
    | EmptyStringCommandDescriptionException
