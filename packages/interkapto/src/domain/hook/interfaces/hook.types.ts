import { GitHooks, HookNameExceptions } from '@value-objects/hook-name/interfaces/hook-name.types';

export interface IHookDTO {
    hookName: GitHooks
    hookScript: string
}

export type HookExceptions =
    | HookNameExceptions

export interface IExecuteSyncError {
    status: number
    signal: null | number
    output: [null, IExecuteSyncError['stdout'], IExecuteSyncError['stderr']]
    pid: number,
    stdout: Buffer,
    stderr: Buffer
}
