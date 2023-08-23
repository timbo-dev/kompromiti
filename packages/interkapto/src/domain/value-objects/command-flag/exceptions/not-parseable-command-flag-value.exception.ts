import Exception from '@shared/exception/exception';

export default class NotParsableCommandFlagValueException extends Exception {
    public constructor(
        providedValue: string
    ) {
        super(`Cannot parse the provided flag-value '${providedValue}' the parser uses JSON.parse().`);
    }
}
