import EmptyStringCommandFlagException from '../exceptions/empty-string-command-flag.exception';
import NonStringCommandFlagValueException from '../exceptions/non-string-command-flag-value.exception';
import NonStringCommandFlagException from '../exceptions/non-string-command-flag.exception';
import NotParsableCommandFlagValueException from '../exceptions/not-parseable-command-flag-value.exception';
import WhitespaceCommandFlagException from '../exceptions/whitespace-command-flag.exception';

import CommandFlag from '../command-flag.entity';
import { FlagTypes, ICommandFlagDTO } from '../interfaces/command-flag.types';

describe('command-flag value object entity tests', () => {
    it('should create a command flag', () => {
        const sut = CommandFlag.create({
            flagName: 'force',
            flagValue: 'true',
            flagType: 'boolean'
        });

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandFlag);

        const sutCommandFlag = (sut.getValue() as CommandFlag<'boolean'>);

        expect(sutCommandFlag.getFlagName()).toBe('force');
        expect(sutCommandFlag.getFlagValue()).toBe(true);
    });

    it('should validate a command flag', () => {
        const sut = CommandFlag.validate({
            flagName: 'force',
            flagValue: 'null',
            flagType: 'null'
        });

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toStrictEqual({
            flagName: 'force',
            flagValue: 'null',
            flagType: 'null'
        } as ICommandFlagDTO<'null'>);
    });

    it('should contains a null flag value as default', () => {
        const sut = CommandFlag.create({
            flagName: 'force',
            flagType: 'null'
        });

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandFlag);

        const sutCommandFlag = (sut.getValue() as CommandFlag<null>);

        expect(sutCommandFlag.getFlagName()).toBe('force');
        expect(sutCommandFlag.getFlagValue()).toBe(null);
    });

    it('should return an exception if the provided flag name is a non string value', () => {
        const sut = CommandFlag.create({
            flagName: undefined as string,
            flagType: 'null'
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandFlagException);
    });

    it('should not create a command flag with an empty string value', () => {
        const sut = CommandFlag.create({
            flagName: '',
            flagType: 'null'
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(EmptyStringCommandFlagException);
    });

    it('should not create a command flag if command flag contains whitespace characters', () => {
        const sut = CommandFlag.create({
            flagName: 'a b',
            flagType: 'null'
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(WhitespaceCommandFlagException);
    });

    it('should return an exception if the flag value is unable to be parsed', () => {
        const sut = CommandFlag.create({
            flagName: 'force',
            flagValue: '""unable to parse""',
            flagType: 'string'
        });

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NotParsableCommandFlagValueException);
    });

    it('should not create a command flag if the command flag value is not a string', () => {
        const sut = CommandFlag.create({
            flagName: 'force',
            flagValue: false as unknown as string,
            flagType: 'boolean'
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

    it('should verify if the flag DTO contains duplicated flags', () => {
        const duplicatedFlags: ICommandFlagDTO<'boolean'>[] = [
            {
                flagName: 'force',
                flagValue: 'true',
                flagType: 'boolean'
            },
            {
                flagName: 'force',
                flagValue: 'false',
                flagType: 'boolean'
            }
        ];

        const validFlags: ICommandFlagDTO<'boolean'>[] = [
            {
                flagName: 'other',
                flagValue: 'true',
                flagType: 'boolean'
            },
            {
                flagName: 'force',
                flagValue: 'false',
                flagType: 'boolean'
            }
        ];

        expect(CommandFlag.isDuplicated(duplicatedFlags)).toBe(true);
        expect(CommandFlag.isDuplicated(validFlags)).toBe(false);
    });

    it('should create multiple valid flags', () => {
        const sut = CommandFlag.createFlags([
            {
                flagName: 'other',
                flagValue: 'true',
                flagType: 'boolean'
            },
            {
                flagName: 'help',
                flagValue: 'message!',
                flagType: 'string'
            },
            {
                flagName: 'force',
                flagValue: 'false',
                flagType: 'boolean'
            }
        ]);

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(Array);

        const sutCommandFlags = (sut.getValue() as CommandFlag<'boolean' | 'string'>[]);

        const commandFlagsArrayNames: string[] = [];
        const commandFlagsArrayValues: Array<string | boolean> = [];
        const commandFlagsArrayTypes: FlagTypes[] = [];

        for (const flag of sutCommandFlags) {
            expect(flag).toBeInstanceOf(CommandFlag);

            commandFlagsArrayNames.push(flag.getFlagName());
            commandFlagsArrayValues.push(flag.getFlagValue());
            commandFlagsArrayTypes.push(flag.getFlagType());
        }

        expect(commandFlagsArrayNames).toStrictEqual([
            'other',
            'help',
            'force'
        ]);

        expect(commandFlagsArrayValues).toStrictEqual([
            true,
            'message!',
            false
        ]);

        expect(commandFlagsArrayTypes).toStrictEqual([
            'boolean',
            'string',
            'boolean'
        ] as FlagTypes[]);
    });
});
