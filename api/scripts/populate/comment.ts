import axios from 'axios';

import { Comment } from '../../src/modules/comment/comment.entity';
import { ReactionType } from '../../src/modules/comment/reaction.entity';
import { Information } from '../../src/modules/information/information.entity';

import { CommentDto } from './dtos/Comment';
import { FindUser } from './main';
import { AuthenticatedUser } from './user';

const updateComment = async (comment: Comment, updatedText: string, findUser: FindUser) => {
  const author = findUser(comment.author.nick);
  const payload = {
    text: updatedText,
  };

  const { data } = await axios.put('/api/comment/' + comment.id, payload, {
    headers: { cookie: author.cookie },
  });

  return data;
};

const createReaction = async (comment: Comment, type: ReactionType, user: AuthenticatedUser) => {
  const payload = {
    type,
  };

  await axios.post('/api/comment/' + comment.id + '/reaction', payload, {
    headers: { cookie: user.cookie },
  });
};

export const createComment = async (
  comment: CommentDto,
  information: Information,
  parent: Comment | null,
  findUser: FindUser,
) => {
  const author = findUser(comment.author);
  const payload = {
    informationId: information.id,
    parentId: parent?.id,
    text: comment.text,
  };

  const { data } = await axios.post('/api/comment', payload, {
    headers: { cookie: author.cookie },
  });

  let created = data;

  if (comment.history) {
    for (const text of comment.history)
      created = await updateComment(created, text, findUser);
  }

  if (comment.reactions) {
    const qr = comment.reactions;

    await Promise.all([
      qr.approve?.map(findUser).map(user => createReaction(created, ReactionType.APPROVE, user)),
      qr.refute?.map(findUser).map(user => createReaction(created, ReactionType.REFUTE, user)),
      qr.skeptic?.map(findUser).map(user => createReaction(created, ReactionType.SKEPTIC, user)),
    ]);
  }

  if (comment.replies) {
    for (const reply of comment.replies) {
      await createComment(reply, information, created, findUser);
    }
  }

  return created;
};
