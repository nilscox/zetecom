const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { Information } = require('../../models');

module.exports = Validator({
  title: ValueValidator({
    type: 'string',
    required: true,
    validate: value => {
      if (value.length < 4)
        throw new ValidationError('the title is too short');
    },
  }),
  url: ValueValidator({
    type: 'string',
    required: true,
    validate: async (value, opts) => {
      if (!opts.unique)
        return;

      const info = await Information.findOne({
        where: { url: value },
      });

      if (info)
        throw new ValidationError('this url is already registered');
    },
  }),
  slug: ValueValidator({
    type: 'string',
    readOnly: true,
  }),
  image: ValueValidator({
    type: 'string',
    readOnly: true,
  }),
});
