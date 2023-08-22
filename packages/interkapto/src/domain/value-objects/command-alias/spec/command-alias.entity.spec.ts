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
});
