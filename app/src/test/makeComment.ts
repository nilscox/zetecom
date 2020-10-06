import { Comment, ReactionType } from '../types/Comment';

const makeComment = (partial?: Partial<Comment>): Comment => ({
  ...partial,
  id: 1,
  quote: null,
  text: 'text',
  date: new Date(),
  edited: false,
  repliesCount: 0,
  author: {
    id: 1,
    avatar: null,
    nick: 'author',
  },
  reactionsCount: {
    [ReactionType.APPROVE]: 1,
    [ReactionType.REFUTE]: 2,
    [ReactionType.SKEPTIC]: 3,
  },
  userReaction: null,
  subscribed: false,
  score: 0,
});

export default makeComment;
