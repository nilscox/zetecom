import { Comment, ReactionType } from '../types/Comment';

const makeComment = (partial?: Partial<Comment>): Comment => ({
  id: 1,
  text: 'text',
  date: new Date().toISOString(),
  edited: false,
  repliesCount: 0,
  author: {
    id: 1,
    avatar: null,
    nick: 'author',
  },
  reactionsCount: {
    [ReactionType.like]: 1,
    [ReactionType.approve]: 2,
    [ReactionType.think]: 3,
    [ReactionType.disagree]: 4,
    [ReactionType.dontUnderstand]: 5,
  },
  userReaction: null,
  subscribed: false,
  score: 0,
  ...partial,
});

export default makeComment;
