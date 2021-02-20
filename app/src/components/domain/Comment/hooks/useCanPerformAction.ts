import { Comment as CommentType } from 'src/types/Comment';
import { User } from 'src/types/User';

type Action = 'toggleReplies' | 'setReaction' | 'edit' | 'reply' | 'subscribe' | 'report' | 'viewHistory';

const useCanPerformAction = (user: User | null, comment: CommentType) => {
  const isConnected = user !== null;
  const isOwnComment = isConnected && comment.author.id === user?.id;

  const can = (action: Action) => {
    if (action === 'toggleReplies') {
      return true;
    }

    if (action === 'setReaction') {
      return isConnected && !isOwnComment;
    }

    if (action === 'edit') {
      return isOwnComment;
    }

    if (action === 'reply') {
      return Boolean(isConnected);
    }

    if (action === 'subscribe') {
      return Boolean(isConnected);
    }

    if (action === 'report') {
      return Boolean(isConnected) && !isOwnComment;
    }

    if (action === 'viewHistory') {
      return comment.edited;
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  return <T extends Function>(action: Action, cb: T) => (can(action) ? cb : undefined);
};

export default useCanPerformAction;
