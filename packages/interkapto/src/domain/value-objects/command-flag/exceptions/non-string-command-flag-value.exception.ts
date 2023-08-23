import Exception from '@shared/exception/exception';

export default class NonStringCommandFlagValueException extends Exception {
    public constructor(
        value: unknown
    ) {
        super(`Cannot create command-flag-value because the provided value type is '${typeof value}', expected a string value.`);
    }
}
