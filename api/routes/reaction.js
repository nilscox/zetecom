const express = require('express');
const { extra, NotFoundError } = require('express-extra');
const { isSignedIn } = require('../permissions');
const reactionValidator = require('../validators/reaction-validator');
const reactionFormatter = require('../formatters/reaction-formatter');
const { User, Reaction, Message } = require('../../models');

const router = module.exports = express.Router();

router.param('slug', async (req, res, next, slug) => {
  try {
    const reactions = await req.information.getReactions({
      where: { slug },
      include: [Message],
    });

    if (reactions.length === 0)
      throw new NotFoundError('REACTION_NOT_FOUND', 'reaction');

    req.reaction = reactions[0];
    next();
  } catch (e) {
    next(e);
  }
});

router.get('/', extra(async (req) => {
  return await req.information.reactions;
}, {
  format: reactionFormatter.many,
}));

router.post('/', extra(async (req) => {
  const { text, answerTo: answerToSlug } = req.validated;
  delete req.validated.text;
  delete req.validated.answerTo;

  let answerToId = null;

  if (answerToSlug) {
    const answerTo = await req.information.getReactions({
      where: { slug: answerToSlug },
    });

    if (answerTo.length === 0)
      throw new NotFoundError('REACTION_NOT_FOUND', 'reaction');

    answerToId = answerTo[0].get('id');
    delete req.validated.quote;
  }

  const reaction = new Reaction({
    ...req.validated,
    slug: Math.random().toString(36).slice(4),
    informationId: req.information.id,
    answerToId: answerToId,
    authorId: req.user.id,
  });

  await reaction.save();
  await reaction.createMessage({ text });
  await reaction.reload();

  return reaction;
}, {
  authorize: isSignedIn,
  validate: req => reactionValidator(req.body),
  format: reactionFormatter,
}));

router.get('/:slug', extra((req) => req.reaction, {
  format: value => reactionFormatter(value, { history: true }),
}));

router.post('/:slug/edit', extra(async (req) => {
  const { reaction, validated } = req;
  const { text } = validated;

  await reaction.createMessage({ text });
  await reaction.reload({ include: [Message] });

  return reaction;
}, {
  authorize: isSignedIn,
  validate: req => reactionValidator(req.body, {
    label: { readOnly: true },
    quote: { readOnly: true },
  }),
  format: value => reactionFormatter(value, { history: true }),
}));
