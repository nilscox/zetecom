import axios from 'axios';

import { createComment } from './comment';
import { CommentsAreaDto } from './dtos/CommentsArea';
import { FindUser } from './main';

const findCommentsAreac = async (commentsArea: CommentsAreaDto) => {
  const { data } = await axios.get('/api/comments-area/by-identifier/' + encodeURIComponent(commentsArea.identifier));

  return data;
};

const createCommentsArea = async (commentsArea: CommentsAreaDto, findUser: FindUser) => {
  const creator = findUser(commentsArea.creator);
  const payload = {
    identifier: commentsArea.identifier,
    informationUrl: commentsArea.informationUrl,
    informationTitle: commentsArea.informationTitle,
    informationAuthor: commentsArea.informationAuthor,
  };

  const { data } = await axios.post('/api/comments-area', payload, {
    headers: { cookie: creator.cookie },
  });

  return data;
};

export const findOrCreateCommentsArea = async (commentsArea: CommentsAreaDto, findUser: FindUser) => {
  try {
    return await findCommentsAreac(commentsArea);
  } catch (e) {
    if (!e.response || e.response.status !== 404)
      throw e;

    const created = await createCommentsArea(commentsArea, findUser);

    if (commentsArea.comments) {
      for (const comment of commentsArea.comments) {
        await createComment(comment, created, null, findUser);
      }
    }

    return created;
  }
};
