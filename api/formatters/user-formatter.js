const { Formatter } = require('express-extra');

module.exports = Formatter({
  email: (inst, opts) => opts.full ? inst.get('email') : undefined,
  nick: (inst) => inst.get('nick'),
  avatar: inst => inst.get('avatar'),
  about: inst => {
    const about = inst.get('about');

    if (about === null)
      return;

    return about;
  },
});
