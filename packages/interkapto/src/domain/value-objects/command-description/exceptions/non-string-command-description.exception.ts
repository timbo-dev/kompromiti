import Exception from '@shared/exception/exception';

export default class NonStringCommandDescriptionException extends Exception {
    public constructor(
        value: unknown
    ) {
        super(`Cannot create command-description because the provided value type is '${typeof value}', expected a string value.`);
    }
}
