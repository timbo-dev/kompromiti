import Exception from '@shared/exception/exception';

import CommandFlag from '../command-flag.entity';

export default class NotMatchCommandFlagTypeException extends Exception {
    public constructor(
        providedFlagType: string
    ) {
        super(`The provided flag type '${providedFlagType}' is not supported, use this options: \n`
            + CommandFlag.getFlagTypes().join('\n')
        );
    }
}
