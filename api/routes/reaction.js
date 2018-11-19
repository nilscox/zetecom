const express = require('express');
const { extra, Authorizer, NotFoundError } = require('express-extra');
const { isSignedIn } = require('../permissions');
const reactionValidator = require('../validators/reaction-validator');
const reactionFormatter = require('../formatters/reaction-formatter');
const { User, Reaction, Message, Vote } = require('../../models');

const router = module.exports = express.Router();

router.param('slug', async (req, res, next, slug) => {
  try {
    const reactions = await req.information.getReactions({
      where: { slug },
    });

    if (reactions.length === 0)
      throw new NotFoundError('REACTION_NOT_FOUND', 'reaction');

    if (req.user)
      reactions.forEach(r => r.fillUserVote(req.user.id));

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
  await reaction.reload();

  return reaction;
}, {
  authorize: Authorizer.and([
    isSignedIn,
    req => req.reaction.author.id === req.user.id,
  ]),
  validate: req => reactionValidator(req.body, {
    label: { readOnly: true },
  }),
  format: value => reactionFormatter(value, { history: true }),
}));

const setVote = async (userId, reaction, vote) => {
  const votes = await reaction.getVotes({
    where: { userId },
  });

  if (votes.length === 0)
    await reaction.createVote({ userId: user.id, approve: vote });
  else if (votes[0].get('approve') !== vote)
    await votes[0].update({ approve: vote });
  else
    return reaction;

  await reaction.reload();
  reaction.fillUserVote(userId);

  return reaction;
};

router.post('/:slug/approve', extra(async (req) => {
  return setVote(req.user.id, req.reaction, true);
}, {
  authorize: Authorizer.and([
    isSignedIn,
    // label == 1, 2, 3
  ]),
  format: reactionFormatter,
}));

router.post('/:slug/refute', extra(async (req) => {
  return setVote(req.user.id, req.reaction, false);
}, {
  authorize: Authorizer.and([
    isSignedIn,
    // label == 1, 2, 3
  ]),
  format: reactionFormatter,
}));

router.post('/:slug/clearvote', extra(async (req) => {
  return setVote(req.user.id, req.reaction, null);
}, {
  authorize: Authorizer.and([
    isSignedIn,
    // label == 1, 2, 3
  ]),
  format: reactionFormatter,
}));
