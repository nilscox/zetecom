const bcrypt = require('bcrypt');
const express = require('express');
const { extra, NotFoundError, AuthorizationError, ValidationError } = require('express-extra');
const { User } = require('../../models');
const { isSignedIn, isNotSignedIn } = require('../permissions');
const userValidator = require('../validators/user-validator');
const userFormatter = require('../formatters/user-formatter');

const router = module.exports = express.Router();

router.post('/signin', extra(async (req) => {
  const { validated } = req;
  const user = await User.find({
    where: { email: validated.email },
  });

  if (!user)
    throw new AuthorizationError('INVALID_CREDENTIALS');

  if (!(await bcrypt.compare(validated.password, user.password)))
    throw new AuthorizationError('INVALID_CREDENTIALS');

  req.session.userId = user.id;

  return user;
}, {
  authorize: isNotSignedIn,
  validate: req => userValidator(req.body, {
    nick: { readOnly: true },
    about: { readOnly: true },
  }),
  format: value => userFormatter(value, { full: true }),
}));

router.post('/signup', extra(async (req) => {
  const { validated } = req;

  validated.password = await bcrypt.hash(validated.password, 10);

  const user = await User.create(validated);

  req.session.userId = user.id;

  return user;
}, {
  authorize: isNotSignedIn,
  validate: req => userValidator(req.body, {
    email: { unique: true },
    password: { min: 6, max: 72 },
  }),
  format: value => userFormatter(value, { full: true }),
}));

router.post('/signout', extra((req) => {
  delete req.session.userId;
}, {
  authorize: isSignedIn,
}));
