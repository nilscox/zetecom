const { ValidationError } = require('express-extra');

const stringNotEmpty = () => value => {
  if (value.length === 0)
    throw new ValidationError('MISSING_VALUE');
}

const stringMinLength = (length, message) => value => {
  if (value.length < length)
    throw new ValidationError(message);
};

const stringMaxLength = (length, message) => value => {
  if (value.length > length)
    throw new ValidationError(message);
};

const stringIsUrl = message => value => {
  if (!value.match(/https?:\/\//))
    throw new ValidationError(message);
};

const stringIsEmail = message => value => {
  if (!value.match(/.+@.+\..+/))
    throw new ValidationError(message);
};

const stringTrim = () => value => {
  return value.trim();
}

module.exports = {
  stringNotEmpty,
  stringMinLength,
  stringMaxLength,
  stringIsUrl,
  stringIsEmail,
  stringTrim,
};
