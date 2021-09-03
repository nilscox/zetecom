import { Comment, CommentDto } from '../../entities/Comment';

const pick = <T extends Record<string, unknown>, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> => {
  return keys.reduce((obj, key) => (key in object ? { ...obj, [key]: object[key] } : obj), {} as Pick<T, K>);
};

export const commentDtoToEntity = (dto: CommentDto): Comment => ({
  ...dto,
  replies: [],
  areRepliesOpen: false,
  isEditing: false,
  isSubmittingEdition: false,
  isFetchingReplies: false,
  isReplyFormOpen: false,
  isSubmittingReply: false,
});

export const commentEntityToDto = (comment: Comment): CommentDto => {
  return pick(
    comment,
    'id',
    'text',
    'date',
    'edited',
    'repliesCount',
    'author',
    'reactionsCount',
    'userReaction',
    'subscribed',
    'score',
  );
};
