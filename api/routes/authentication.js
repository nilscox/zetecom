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
    throw new AuthorizationError('invalid user / password');

  if (!(await bcrypt.compare(validated.password, user.password)))
    throw new AuthorizationError('invalid user / password');

  req.session.userId = user.id;

  return user;
}, {
  authorize: isNotSignedIn,
  validate: req => userValidator(req.body),
  format: userFormatter,
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
  format: userFormatter,
}));

router.post('/signout', extra((req) => {
  delete req.session.userId;
}, {
  authorize: isSignedIn,
}));
