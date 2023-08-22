import Exception from '@shared/exception/exception';

export default class EmptyStringCommandAliasException extends Exception {
    public constructor() {
        super('Cannot create command-alias becuase the provided command alias is an empty string');
    }
}
