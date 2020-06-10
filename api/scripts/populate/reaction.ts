import axios from 'axios';

import { Information } from '../../src/modules/information/information.entity';
import { QuickReactionType } from '../../src/modules/reaction/quick-reaction.entity';
import { Reaction } from '../../src/modules/reaction/reaction.entity';

import { ReactionDto } from './dtos/Reaction';
import { FindUser } from './main';
import { AuthenticatedUser } from './user';

const updateReaction = async (reaction: Reaction, updatedText: string, findUser: FindUser) => {
  const author = findUser(reaction.author.nick);
  const payload = {
    text: updatedText,
  };

  const { data } = await axios.put('/api/reaction/' + reaction.id, payload, {
    headers: { cookie: author.cookie },
  });

  return data;
};

const createQuickReaction = async (reaction: Reaction, type: QuickReactionType, user: AuthenticatedUser) => {
  const payload = {
    type,
  };

  await axios.post('/api/reaction/' + reaction.id + '/quick-reaction', payload, {
    headers: { cookie: user.cookie },
  });
};

export const createReaction = async (
  reaction: ReactionDto,
  information: Information,
  parent: Reaction | null,
  findUser: FindUser,
) => {
  const author = findUser(reaction.author);
  const payload = {
    informationId: information.id,
    parentId: parent?.id,
    text: reaction.text,
  };

  const { data } = await axios.post('/api/reaction', payload, {
    headers: { cookie: author.cookie },
  });

  let created = data;

  if (reaction.history) {
    for (const text of reaction.history)
      created = await updateReaction(created, text, findUser);
  }

  if (reaction.quickReactions) {
    const qr = reaction.quickReactions;

    await Promise.all([
      qr.approve?.map(findUser).map(user => createQuickReaction(created, QuickReactionType.APPROVE, user)),
      qr.refute?.map(findUser).map(user => createQuickReaction(created, QuickReactionType.REFUTE, user)),
      qr.skeptic?.map(findUser).map(user => createQuickReaction(created, QuickReactionType.SKEPTIC, user)),
    ]);
  }

  if (reaction.replies) {
    for (const reply of reaction.replies) {
      await createReaction(reply, information, created, findUser);
    }
  }

  return created;
};
