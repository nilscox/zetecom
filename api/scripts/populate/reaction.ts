import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { InformationOutDto } from '../../src/modules/information/dtos/information-out.dto';
import { ReactionOutDto } from '../../src/modules/reaction/dtos/reaction-out.dto';
import { QuickReactionType } from '../../src/modules/reaction/quick-reaction.entity';

import { Reaction } from './dtos/Reaction';
import { FindUser } from './main';
import { AuthenticatedUser } from './user';

const updateReaction = async (reaction: ReactionOutDto, updatedText: string, findUser: FindUser): Promise<ReactionOutDto> => {
  const author = findUser(reaction.author.nick);
  const payload = {
    text: updatedText,
  };

  const { data } = await axios.put('/api/reaction/' + reaction.id, payload, {
    headers: { cookie: author.cookie },
  });

  return plainToClass(ReactionOutDto, data);
};

const createQuickReaction = async (reaction: ReactionOutDto, type: QuickReactionType, user: AuthenticatedUser) => {
  const payload = {
    type,
  };

  await axios.post('/api/reaction/' + reaction.id + '/quick-reaction', payload, {
    headers: { cookie: user.cookie },
  });
};

export const createReaction = async (
  reaction: Reaction,
  information: InformationOutDto,
  parent: ReactionOutDto | null,
  findUser: FindUser,
): Promise<ReactionOutDto> => {
  const author = findUser(reaction.author);
  const payload = {
    informationId: information.id,
    parentId: parent?.id,
    text: reaction.text,
  };

  const { data } = await axios.post('/api/reaction', payload, {
    headers: { cookie: author.cookie },
  });

  let created = plainToClass(ReactionOutDto, data);

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
