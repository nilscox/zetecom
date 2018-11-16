const { Formatter } = require('express-extra');

module.exports = Formatter({
  email: inst => inst.get('email'),
  nick: inst => inst.get('nick'),
  avatar: inst => inst.get('avatar'),
  about: inst => inst.get('about'),
  signupDate: inst => inst.get('createdAt'),
});
