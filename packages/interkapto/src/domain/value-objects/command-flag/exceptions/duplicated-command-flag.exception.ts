import Exception from '@shared/exception/exception';

export default class DuplicatedCommandFlagException extends Exception {
    public constructor() {
        super('The provided flags contains duplicated values.');
    }
}
