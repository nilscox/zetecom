const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { User } = require('../../models');

module.exports = Validator({
  email: ValueValidator({
    type: 'string',
    required: true,
    validate: async (value, opts) => {
      if (!value.match(/.+@.+\..+/))
        throw new ValidationError('invalid email format');

      if (!opts.unique)
        return;

      const existing = await User.find({
        where: { email: value },
      });

      if (existing)
        throw new ValidationError('this email already exists');
    },
  }),
  password: ValueValidator({
    type: 'string',
    required: true,
    validate: (value, opts) => {
      if (value.length < opts.min)
        throw new ValidationError('the password must be at least ' + opts.min + ' characters');

      if (value.length > opts.max)
        throw new ValidationError('the password must be at most ' + opts.max + ' characters');
    },
  }),
  about: ValueValidator({
    type: 'string',
    required: true,
    allowNull: true,
    defaultValue: null,
  }),
});
