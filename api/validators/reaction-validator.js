const { Validator, ValueValidator, ValidationError } = require('express-extra');
const { Information } = require('../../models');
const LABELS = require('../labels');
const { stringNotEmpty } = require('./validation');

module.exports = Validator({
  text: ValueValidator({
    type: 'string',
    required: true,
    validate: stringNotEmpty,
  }),
  label: ValueValidator({
    type: 'string',
    required: true,
    validate: value => {
      const idx = Object.values(LABELS).findIndex(l => l === value);

      if (idx < 0)
        throw new ValidationError('REACTION_INVALID_LABEL');

      return parseInt(Object.keys(LABELS)[idx]);
    },
  }),
  quote: ValueValidator({
    type: 'string',
    required: false,
    validate: stringNotEmpty,
  }),
  slug: ValueValidator({
    type: 'string',
    readOnly: true,
  }),
  answerTo: ValueValidator({
    type: 'string',
    required: false,
  }),
});
