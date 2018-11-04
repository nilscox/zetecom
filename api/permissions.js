const { Authorizer } = require('express-extra');

const { not } = Authorizer;

const isSignedIn = Authorizer(req => req.session.userId !== undefined, 'MUST_BE_SIGNED_IN');
const isNotSignedIn = not(isSignedIn, 'MUST_NOT_BE_SIGNED_IN');

module.exports = {
  isSignedIn,
  isNotSignedIn,
};
