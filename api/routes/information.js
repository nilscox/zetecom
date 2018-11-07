const path = require('path');
const express = require('express');
const { extra, NotFoundError } = require('express-extra');
const { isSignedIn } = require('../permissions');
const informationValidator = require('../validators/information-validator');
const informationFormatter = require('../formatters/information-formatter');
const { getLabelKey } = require('../labels');
const { User, Information, Reaction, Message } = require('../../models');
const reaction = require('./reaction');

const router = module.exports = express.Router();

const slugify = text => {
  return text.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .slice(0, 32)
    + '-' + Math.random().toString(36).slice(4);
};

router.param('slug', async (req, res, next, slug) => {
  try {
    const information = await Information.findOne({
      where: { slug },
      include: [Reaction],
      order: [[Reaction, 'createdAt', 'DESC']],
    });

    if (!information)
      next(new NotFoundError('INFORMATION_NOT_FOUND', 'information'));
    else {
      const allReactions = information.reactions;
      const reactions = allReactions.filter(r => r.answerToId === null);

      reactions.forEach(r => r.fillAnswers(allReactions));

      information.reactions = reactions;
      req.information = information;

      next();
    }
  } catch (e) {
    next(e);
  }
});

router.get('/list', extra(async (req) => {
  return await Information.findAll();
}, {
  format: value => informationFormatter.many(value, { omitReactions: true }),
}));

router.get('/:slug', extra(req => req.information, {
  format: informationFormatter,
}));

router.post('/', extra(async (req) => {
  const { validated } = req;

  const information = new Information({
    ...req.validated,
    slug: slugify(validated.title),
    image: null,
    userId: req.user.id,
  });

  await information.save();
  await information.reload({ include: [Reaction] });

  return information;
}, {
  authorize: isSignedIn,  
  validate: req => informationValidator(req.body, {
    url: { unique: true },
  }),
  format: informationFormatter,
}));

router.use('/:slug/reaction', reaction);
