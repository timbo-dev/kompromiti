import Exception from '@shared/exception/exception';

export default class NonStringHookNameException extends Exception {
    public constructor(value: any) {
        super(`The provided type '${typeof value}' is not a string, to create a hook-name you need to pass a string value`);
    }
}
