import EmptyStringCommandNameException from '../exceptions/empty-string-command-name.exception';
import NonStringCommandNameException from '../exceptions/non-string-command-name.exception';
import WhitespaceCommandNameException from '../exceptions/whitespace-command-name.exception';

export type CommandNameExceptions =
    | EmptyStringCommandNameException
    | NonStringCommandNameException
    | WhitespaceCommandNameException
