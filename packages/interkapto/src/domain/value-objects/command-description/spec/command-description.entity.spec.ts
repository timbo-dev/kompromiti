import EmptyStringCommandDescriptionException from '../exceptions/empty-string-command-description.exception';
import NonStringCommandDescriptionException from '../exceptions/non-string-command-description.exception';

import CommandDescription from '../command-description.entity';

describe('command-description value object entity tests', () => {
    const loremIpsum = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates magnam deserunt quos dolore esse dolorum ipsam ut, voluptas ipsa quibusdam.';

    it('should create a command description object', () => {
        const sut = CommandDescription.create(loremIpsum);

        expect(sut.isOk()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(CommandDescription);

        const sutCommandDescription = (sut.getValue() as CommandDescription);

        expect(sutCommandDescription.getDescription()).toBe(loremIpsum);
    });

    it('should return an error when the provided description is a non-string value', () => {
        const sut = CommandDescription.create(undefined as string);

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(NonStringCommandDescriptionException);
    });

    it('should return an empty string exception from validate method', () => {
        const sut = CommandDescription.validate('');

        expect(sut.isErr()).toBe(true);
        expect(sut.getValue()).toBeInstanceOf(EmptyStringCommandDescriptionException);
    });
});
