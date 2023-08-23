import Exception from '@shared/exception/exception';

export default class WhitespaceCommandFlagException extends Exception {
    public constructor(commandAlias: string) {
        super(`Cannot create command-flag the provided command flag '${commandAlias}' contains whitespace characters`);
    }
}
