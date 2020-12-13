import { registerDecorator, ValidationOptions } from 'class-validator';
import { isPast } from 'date-fns';

export function IsPast(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPast',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        defaultMessage: () => '$property must be before now',
        validate(text: string) {
          const date = new Date(text);

          if (!isNaN(date.getTime())) {
            return isPast(date);
          }

          return true;
        },
      },
    });
  };
}
