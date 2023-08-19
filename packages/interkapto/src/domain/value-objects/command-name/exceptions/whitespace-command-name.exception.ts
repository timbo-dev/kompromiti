import Exception from '@shared/exception/exception';

export default class WhitespaceCommandNameException extends Exception {
    public constructor(commandName: string) {
        super(`Cannot create command-name the provided command name '${commandName}' contains whitespace characters`);
    }
}
