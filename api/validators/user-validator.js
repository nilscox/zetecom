const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { User } = require('../../models');

module.exports = Validator({
  email: ValueValidator({
    type: 'string',
    required: true,
    validate: async (value, opts) => {
      if (!value.match(/.+@.+\..+/))
        throw new ValidationError('USER_EMAIL_INVALID_FORMAT');

      if (!opts.unique)
        return;

      const existing = await User.find({
        where: { email: value },
      });

      if (existing)
        throw new ValidationError('USER_EMAIL_ALREADY_EXISTS');
    },
  }),
  password: ValueValidator({
    type: 'string',
    required: true,
    validate: (value, opts) => {
      if (value.length < opts.min)
        throw new ValidationError('USER_PASSWORD_TOO_SHORT');

      if (value.length > opts.max)
        throw new ValidationError('USER_PASSWORD_TOO_LONG');
    },
  }),
  about: ValueValidator({
    type: 'string',
    required: true,
    allowNull: true,
    defaultValue: null,
  }),
});
