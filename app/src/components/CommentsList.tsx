import React from 'react';

import { Comment } from 'src/types/Comment';

import Padding from './Padding';
import CommentContainer from './Comment';

type CommentsListProps = {
  comments: Comment[];
};

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  if (!comments.length)
    return null;

  return (
    <div className="comments-list">
      { comments.map((comment, n) => (
        <Padding key={comment.id} top when={n > 0}>
          <CommentContainer comment={comment} />
        </Padding>
      )) }
    </div>
  );
};

export default CommentsList;
