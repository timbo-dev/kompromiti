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
});
