import Exception from '@shared/exception/exception';

export default class EmptyStringCommandFlagException extends Exception {
    public constructor() {
        super('Cannot create command-flag becuase the provided command flag is an empty string');
    }
}
