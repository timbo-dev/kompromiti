import Exception from '@shared/exception/exception';

export default class WhitespaceCommandAliasException extends Exception {
    public constructor(commandAlias: string) {
        super(`Cannot create command-alias the provided command alias '${commandAlias}' contains whitespace characters`);
    }
}
