const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { Information } = require('../../models');

module.exports = Validator({
  title: ValueValidator({
    type: 'string',
    required: true,
    validate: value => {
      if (value.length < 4)
        throw new ValidationError('INFORMATION_TITLE_TOO_SHORT');
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
        throw new ValidationError('INFORMATION_URL_ALREADY_EXISTS');
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
