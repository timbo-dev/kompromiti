import EmptyStringCommandNameException from '../exceptions/empty-string-command-name.exception';
import NonStringCommandNameException from '../exceptions/non-string-command-name.exception';
import WhitespaceCommandNameException from '../exceptions/whitespace-command-name.exception';

import CommandName from '../command-name.entity';

describe('command-name value object entity tests', () => {
    it('should create a command name value object entity', () => {
        const sut = CommandName.create('command');

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandName);

        const commandName = (sut.getValue() as CommandName);

        expect(commandName.getName()).toBe('command');
    });

    it('should not create a command with a non string value', () => {
        const sut = CommandName.create(undefined as string);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandNameException);
    });

    it('should not create a command with an empty string value', () => {
        const sut = CommandName.create('');

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(EmptyStringCommandNameException);
    });

    it('should not create a command if command contains whitespace characters', () => {
        const sut = CommandName.create('command name');

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(WhitespaceCommandNameException);
    });
});
