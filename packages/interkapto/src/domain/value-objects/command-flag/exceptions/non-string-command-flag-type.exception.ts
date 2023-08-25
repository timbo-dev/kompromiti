import Exception from '@shared/exception/exception';

export default class NonStringCommandFlagTypeException extends Exception {
    public constructor(
        value: unknown
    ) {
        super(`Cannot create command-flag-type because the provided value type is '${typeof value}', expected a string value.`);
    }
}
