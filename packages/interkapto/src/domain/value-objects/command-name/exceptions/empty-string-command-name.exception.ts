import Exception from '@shared/exception/exception';

export default class EmptyStringCommandNameException extends Exception {
    public constructor() {
        super('Cannot create command-name becuase the provided command name is an empty string');
    }
}
