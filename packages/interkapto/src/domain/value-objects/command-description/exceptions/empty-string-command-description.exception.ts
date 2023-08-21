import Exception from '@shared/exception/exception';

export default class EmptyStringCommandDescriptionException extends Exception {
    public constructor() {
        super('The provided Description is an empty string');
    }
}
