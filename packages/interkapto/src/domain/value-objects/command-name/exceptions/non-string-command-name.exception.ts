import Exception from '@shared/exception/exception';

export default class NonStringCommandNameException extends Exception {
    public constructor(value: unknown) {
        super(`Cannot create command-name because the provided value is from type ${typeof value} not a string`);
    }
}
