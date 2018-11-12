const { Formatter } = require('express-extra');
const userFormatter = require('./user-formatter');
const LABELS = require('../labels');

const reactionFormatter = module.exports = Formatter({
  quote: inst => inst.get('quote'),
  text: inst => {
    const l = inst.messages.length;

    if (l === 0)
      return;

    return inst.messages[l - 1].get('text');
  },
  label: inst => LABELS[inst.get('label')],
  slug: inst => inst.get('slug'),
  date: inst => inst.get('createdAt'),
  history: (inst, opts) => {
    if (opts !== true)
      return;

    return inst.messages
      .slice(0, inst.messages.length - 1)
      .map(m => ({
        date: m.get('createdAt'),
        text: m.get('text'),
      }));
  },
  answers: inst => {
    if (!inst.answers || !inst.answers.length)
      return [];

    return reactionFormatter.many(inst.answers);
  },
  author: inst => userFormatter(inst.author),
});
