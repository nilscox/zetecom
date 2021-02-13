import { CommentsArea } from '../types/CommentsArea';

const makeCommentsArea = (partial?: Partial<CommentsArea>): CommentsArea => ({
  id: 1,
  information: {
    media: 'unknown',
    url: 'https://info.url',
    title: "Les premiers pas de l'Homme sur Mars !",
    author: 'Camille Durand',
    publicationDate: new Date(2020, 0, 1),
  },
  commentsCount: 42,
  ...partial,
});

export default makeCommentsArea;
