import EmptyStringCommandAliasException from '../exceptions/empty-string-command-alias.exception';
import NonStringCommandAliasException from '../exceptions/non-string-command-alias.exception';
import WhitespaceCommandAliasException from '../exceptions/whitespace-command-alias.exception';

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

    it('should not create a command alias if command alias contains whitespace characters', () => {
        const sut = CommandAlias.create('a b');

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(WhitespaceCommandAliasException);
    });

    it('should create command aliases with string array', () => {
        const commandAliases = ['force', 'f', 't', 'o'];

        const sut = CommandAlias.createAliases(commandAliases);

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(Array);

        const sutCommandAliasList = (sut.getValue() as CommandAlias[]);
        const expectCommandAliasStringArray: string[] = [];

        for(const sutCommandAlias of sutCommandAliasList) {
            expect(sutCommandAlias).toBeInstanceOf(CommandAlias);

            expectCommandAliasStringArray.push(sutCommandAlias.getAlias());
        }

        expect(expectCommandAliasStringArray).toStrictEqual(commandAliases);
    });

    it('should return an exception if multiple aliases are created with one invalid alias', () => {
        const commandAliases = ['force', 'f', 't', undefined];

        const sut = CommandAlias.createAliases(commandAliases);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandAliasException);
    });

    it('should return the first exception if multiple aliases are invalid', () => {
        const commandAliases = ['whitespace invalid alias', undefined, 'valid'];

        const sut = CommandAlias.createAliases(commandAliases);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(WhitespaceCommandAliasException);
    });

    it('should create multiples aliases removing duplicated values', () => {
        const commandAliases = ['same', 'same', 'same', 'diferent'];

        const sut = CommandAlias.createAliases(commandAliases);

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).instanceOf(Array);

        const sutCommandAliases = (sut.getValue() as CommandAlias[]);

        expect(sutCommandAliases.length).toBe(2);

        const commandAliasesArrayValues: string[] = [];

        for(const commandAlias of sutCommandAliases) {
            expect(commandAlias).toBeInstanceOf(CommandAlias);

            commandAliasesArrayValues.push(commandAlias.getAlias());
        }

        expect(commandAliasesArrayValues).toStrictEqual([
            'same',
            'diferent'
        ]);
    });
});
