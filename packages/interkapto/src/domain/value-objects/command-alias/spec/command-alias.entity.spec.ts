import EmptyStringCommandAliasException from '../exceptions/empty-string-command-alias.exception';
import NonStringCommandAliasException from '../exceptions/non-string-command-alias.exception';

import CommandAlias from '../command-alias.entity';

describe('command-alias value object entity tests', () => {
    it('should create a command alias', () => {
        const sut = CommandAlias.create('a');

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandAlias);

        const sutCommandAlias = (sut.getValue() as CommandAlias);

        expect(sutCommandAlias.getAlias()).toBe('a');
    });

    it('should return an exception if the provided value is a non empty string', () => {
        const sut = CommandAlias.create(undefined as string);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandAliasException);
    });

    it('should not create a command alias with an empty string value', () => {
        const sut = CommandAlias.create('');

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(EmptyStringCommandAliasException);
    });
});
