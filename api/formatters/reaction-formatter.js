const { Formatter } = require('express-extra');
const userFormatter = require('./user-formatter');
const LABELS = require('../labels');

const reactionFormatter = module.exports = Formatter({
  quote: inst => inst.get('quote'),
  text: inst => {
    if (inst.messages.length > 0)
      return inst.messages[0].get('text');
  },
  label: inst => LABELS[inst.get('label')],
  slug: inst => inst.get('slug'),
  date: inst => inst.get('createdAt'),
  lastEdit: inst => {
    if (inst.messages.length > 1)
      return inst.messages[inst.messages.length - 1].get('updatedAt');
  },
  history: (inst, opts) => {
    if (opts !== true)
      return;

    return inst.messages
      .slice(1)
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
  author: inst => userFormatter(inst.author || inst.getAuthor()),
  approves: inst => inst.countVotes({ where: { approve: true } }),
  didApprove: inst => inst.didApprove,
  refutes: inst => inst.countVotes({ where: { approve: false } }),
  didRefute: inst => inst.didRefute,
});
