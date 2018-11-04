const { Authorizer } = require('express-extra');

const { not } = Authorizer;

const isSignedIn = Authorizer(req => req.session.userId !== undefined, 'you must sign in');
const isNotSignedIn = not(isSignedIn, 'you must sign out');

module.exports = {
  isSignedIn,
  isNotSignedIn,
};
