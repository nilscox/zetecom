const { Formatter } = require('express-extra');

module.exports = Formatter({
  email: inst => inst.get('email'),
  about: inst => {
    const about = inst.get('about');

    if (about === null)
      return;

    return about;
  },
});
