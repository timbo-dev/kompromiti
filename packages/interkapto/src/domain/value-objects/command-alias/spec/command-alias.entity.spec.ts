import CommandAlias from '../command-alias.entity';

describe('command-alias value object entity tests', () => {
    it('should create a command alias', () => {
        const sut = CommandAlias.create('a');

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandAlias);

        const sutCommandAlias = (sut.getValue() as CommandAlias);

        expect(sutCommandAlias.getAlias()).toBe('a');
    });
});
