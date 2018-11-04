const express = require('express');
const { extra, NotFoundError } = require('express-extra');
const { isSignedIn } = require('../permissions');
const userFormatter = require('../formatters/user-formatter');

const router = module.exports = express.Router();

router.get('/', extra(req => {
  if (!req.user)
    throw new NotFoundError();

  return req.user;
}, {
  format: userFormatter,
}));
