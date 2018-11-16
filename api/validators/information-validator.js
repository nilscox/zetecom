const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { Information } = require('../../models');
const { getYoutubeId } = require('../services/youtube-service');
const { stringTrim, stringNotEmpty, stringMinLength, stringMaxLength, stringIsUrl } = require('./validation');

module.exports = Validator({
  title: ValueValidator({
    type: 'string',
    required: true,
    validate: [
      stringTrim(),
      stringNotEmpty(),
      stringMinLength(4, 'INFORMATION_TITLE_TOO_SHORT'),
    ],
  }),
  url: ValueValidator({
    type: 'string',
    required: true,
    validate: [
      stringTrim(),
      stringNotEmpty(),
      stringIsUrl('INFORMATION_URL_INVALID_FORMAT'),
      async (value, opts) => {
        if (!opts.unique)
          return;

        const info = await Information.findOne({
          where: { url: value },
        });

        if (info)
          throw new ValidationError('INFORMATION_URL_ALREADY_EXISTS');
      },
    ],
  }),
  slug: ValueValidator({
    type: 'string',
    readOnly: true,
  }),
  image: ValueValidator({
    type: 'string',
    readOnly: true,
  }),
}, obj => {
  obj.youtubeId = getYoutubeId(obj.url);
});
