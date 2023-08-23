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
});
