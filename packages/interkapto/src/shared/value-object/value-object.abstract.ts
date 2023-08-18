import { Either } from '@shared/either/either.type';

import Exception from '@shared/exception/exception';

import err from '@shared/either/err';

export default abstract class AbstractValueObject {
    public static create(value: any): Either<any, any> {
        return err(value);
    }

    public static isLegit<T>(value: T): boolean {
        const validationResult = AbstractValueObject.validate(value);
        return validationResult.isOk();
    }

    public static validate(value: any): Either<Exception, any> {
        return err(value);
    }
}
