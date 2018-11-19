const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { User } = require('../../models');
const { stringTrim, stringNotEmpty, stringMinLength, stringMaxLength, stringIsEmail } = require('./validation');

module.exports = Validator({
  email: ValueValidator({
    type: 'string',
    required: true,
    validate: [
      stringTrim(),
      stringNotEmpty(),
      stringIsEmail('USER_EMAIL_INVALID_FORMAT'),
      async (value, opts) => {
        if (!opts.unique)
          return;

        const existing = await User.find({
          where: { email: value },
        });

        if (existing)
          throw new ValidationError('USER_EMAIL_ALREADY_EXISTS');
      },
    ],
  }),
  password: ValueValidator({
    type: 'string',
    required: true,
    validate: (value, opts) => ([
      stringNotEmpty(),
      stringMinLength(opts.min, 'USER_PASSWORD_TOO_SHORT'),
      stringMaxLength(opts.max, 'USER_PASSWORD_TOO_LONG'),
    ]),
  }),
  nick: ValueValidator({
    type: 'string',
    required: true,
    validate: [
      stringTrim(),
      stringNotEmpty(),
      stringMinLength(4, 'USER_NICK_TOO_SHORT'),
    ],
  }),
  about: ValueValidator({
    type: 'string',
    required: true,
    allowNull: true,
    defaultValue: null,
  }),
});
