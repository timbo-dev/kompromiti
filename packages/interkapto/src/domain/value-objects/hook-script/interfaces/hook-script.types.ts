import NonStringHookScriptException from '../exceptions/non-string-hook-script.exception';

export type HookScriptExceptions =
    | NonStringHookScriptException

export interface IStdout {
    stdout: string
    returnCode: number
}

export interface IStderr extends IStdout {
    stderr: string
}
