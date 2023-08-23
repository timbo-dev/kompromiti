import EmptyStringCommandFlagException from '../exceptions/empty-string-command-flag.exception';
import NonStringCommandFlagValueException from '../exceptions/non-string-command-flag-value.exception';
import NonStringCommandFlagException from '../exceptions/non-string-command-flag.exception';
import WhitespaceCommandFlagException from '../exceptions/whitespace-command-flag.exception';

import CommandFlag from '../command-flag.entity';

describe('command-flag value object entity tests', () => {
    it('should create a command flag', () => {
        const sut = CommandFlag.create({
            flagName: 'force',
            flagValue: 'true'
        });

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandFlag);

        const sutCommandFlag = (sut.getValue() as CommandFlag<boolean>);

        expect(sutCommandFlag.getFlagName()).toBe('force');
        expect(sutCommandFlag.getFlagValue()).toBe(true);
    });

    it('should contains a null flag value as default', () => {
        const sut = CommandFlag.create({
            flagName: 'force'
        });

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandFlag);

        const sutCommandFlag = (sut.getValue() as CommandFlag<null>);

        expect(sutCommandFlag.getFlagName()).toBe('force');
        expect(sutCommandFlag.getFlagValue()).toBe(null);
    });

    it('should return an exception if the provided flag name is a non string value', () => {
        const sut = CommandFlag.create({
            flagName: undefined as string
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandFlagException);
    });

    it('should not create a command flag with an empty string value', () => {
        const sut = CommandFlag.create({
            flagName: ''
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(EmptyStringCommandFlagException);
    });

    it('should not create a command flag if command flag contains whitespace characters', () => {
        const sut = CommandFlag.create({
            flagName: 'a b'
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(WhitespaceCommandFlagException);
    });

    it('should not create a command flag if the command flag value is not a string', () => {
        const sut = CommandFlag.create({
            flagName: 'force',
            flagValue: false as unknown as string
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandFlagValueException);
    });

    it('should parse a command flag value', () => {
        const sutString = CommandFlag.parse('something');
        const sutNumber = CommandFlag.parse('52');
        const sutArray = CommandFlag.parse('["test", 15, true]');
        const sutObject = CommandFlag.parse('{"hello": "world", "number": 52, "boolean": false}');
        const sutBoolean = CommandFlag.parse('true');

        expect(sutString.isOk()).toBe(true);
        expect(sutString.getValue()).toBe('something');

        expect(sutNumber.isOk()).toBe(true);
        expect(sutNumber.getValue()).toBe(52);

        expect(sutArray.isOk()).toBe(true);
        expect(sutArray.getValue()).toStrictEqual([
            'test',
            15,
            true
        ]);

        expect(sutObject.isOk()).toBe(true);
        expect(sutObject.getValue()).toStrictEqual({
            hello: 'world',
            number: 52,
            boolean: false
        });

        expect(sutBoolean.isOk()).toBe(true);
        expect(sutBoolean.getValue()).toBe(true);
    });
});
