import Exception from '@shared/exception/exception';

export default class NonStringCommandFlagException extends Exception {
    public constructor(
        value: unknown
    ) {
        super(`Cannot create command-flag because the provided value type is '${typeof value}', expected a string value.`);
    }
}
