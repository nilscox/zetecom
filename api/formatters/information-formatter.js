const { Formatter } = require('express-extra');
const reactionFormatter = require('./reaction-formatter');

module.exports = Formatter({
  title: inst => inst.get('title'),
  url: inst => inst.get('url'),
  slug: inst => inst.get('slug'),
  image: inst => inst.get('image'),
  reactions: (inst, opts) => {
    if (opts.omitReactions)
      return;

    return reactionFormatter.many(inst.reactions);
  },
});
