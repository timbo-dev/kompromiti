import EmptyStringHookNameException from '../exceptions/empty-string-hook-name.exception';
import InvalidHookNameException from '../exceptions/invalid-hook-name.exception';
import NonStringHookNameException from '../exceptions/non-string-hook-name.exception';

export type GitHooks =
    | 'applypatch-msg'
    | 'commit-msg'
    | 'fsmonitor-watchman'
    | 'post-update'
    | 'pre-applypatch'
    | 'pre-commit'
    | 'pre-merge-commit'
    | 'pre-push'
    | 'pre-rebase'
    | 'pre-receive'
    | 'prepare-commit-msg'
    | 'push-to-checkout'
    | 'sendemail-validate'
    | 'update'

export type HookNameExceptions =
    | EmptyStringHookNameException
    | InvalidHookNameException
    | NonStringHookNameException
