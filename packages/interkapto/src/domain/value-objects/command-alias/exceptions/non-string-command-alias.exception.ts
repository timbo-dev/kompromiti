import Exception from '@shared/exception/exception';

export default class NonStringCommandAliasException extends Exception {
    public constructor(
        value: unknown
    ) {
        super(`Cannot create command-alias because the provided value type is '${typeof value}', expected a string value.`);
    }
}
