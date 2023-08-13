import Exception from '@shared/exception/exception';

export default class EmptyStringHookNameException extends Exception {
    public constructor() {
        super('The provided hook-name cannot be an empty string.');
    }
}
