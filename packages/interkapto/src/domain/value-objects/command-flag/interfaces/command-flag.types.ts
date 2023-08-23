import Exception from '@shared/exception/exception';

export type CommandFlagExceptions =
    | Exception

export interface CommandFlagDTO {
    flagName: string;
    flagValue?: string;
}
