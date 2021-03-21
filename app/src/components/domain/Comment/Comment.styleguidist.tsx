import React, { createContext, useContext } from 'react';

import { Comment as CommentType } from 'src/types/Comment';
import { User } from 'src/types/User';

import Comment from './Comment';

const userContext = createContext<User | null>(null);
const UserProvider = userContext.Provider;

type Replies = { [id: number]: CommentType[] };
const repliesContext = createContext<Replies>({});
const RepliesProvider = repliesContext.Provider;

const useGetReplies = () => {
  const replies = useContext(repliesContext);

  return (comment: CommentType) => {
    if (!(comment.id in replies)) {
      throw new Error(`no replies for comment ${comment.id}`);
    }

    return replies[comment.id];
  };
};

export const StyleguidistCommentContainer: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const user = useContext(userContext);
  const getReplies = useGetReplies();

  const [replies, setReplies] = React.useState<CommentType[]>();
  const [repliesLoading, setRepliesLoading] = React.useState(false);

  React.useEffect(() => {
    if (repliesLoading) {
      const timeout = setTimeout(() => {
        setRepliesLoading(false);
        setReplies(getReplies(comment));
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [repliesLoading, getReplies, comment]);

  const fetchReplies = () => {
    if (replies === undefined) {
      setRepliesLoading(true);
    }
  };

  return (
    <Comment
      CommentContainer={StyleguidistCommentContainer}
      user={user}
      comment={comment}
      replies={replies}
      repliesLoading={repliesLoading}
      submittingEdition={false}
      submittingReply={false}
      onEdit={text => console.log(`edit comment: "${text}"`)}
      onReport={() => console.log('report comment')}
      onSetReaction={type => console.log(`set reaction: ${String(type)}`)}
      onSetSubscription={subscribed => console.log(`set subscrption: ${String(subscribed)}`)}
      onReply={text => console.log(`reply to comment: "${text}"`)}
      onViewHistory={() => console.log('view history')}
      fetchReplies={fetchReplies}
    />
  );
};

type StyleguidistCommentProps = {
  user?: User;
  comment: CommentType;
  replies: Replies;
};

const StyleguidistComment: React.FC<StyleguidistCommentProps> = ({ user, comment, replies }) => (
  <UserProvider value={user ?? null}>
    <RepliesProvider value={replies}>
      <StyleguidistCommentContainer comment={comment} />
    </RepliesProvider>
  </UserProvider>
);

export default StyleguidistComment;
