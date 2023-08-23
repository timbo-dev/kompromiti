import { Either } from '@shared/either/either.type';

import err from '@shared/either/err';

export default abstract class AbstractValueObject {
    public static create(...args: any[]): Either<any, any> {
        return err({...args});
    }

    public static isLegit(...args: any[]): boolean {
        const validationResult = this.validate(...args);
        return validationResult.isOk();
    }

    public static validate(...args: any[]): Either<any, any> {
        return err({...args});
    }
}
