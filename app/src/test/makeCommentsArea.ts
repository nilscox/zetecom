import { CommentsArea } from '../types/CommentsArea';

const makeCommentsArea = (partial?: Partial<CommentsArea>): CommentsArea => ({
  id: 1,
  informationUrl: 'https://info.url',
  informationTitle: 'Les premiers pas de l\'Homme sur Mars !',
  informationAuthor: 'Camille Durand',
  imageUrl: undefined,
  published: new Date(2020, 0, 1),
  creator: {
    id: 1,
    nick: 'user',
    avatar: null,
  },
  commentsCount: 42,
  ...partial,
});

export default makeCommentsArea;
