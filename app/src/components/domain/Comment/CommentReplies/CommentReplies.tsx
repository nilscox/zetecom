import React from 'react';

import styled from '@emotion/styled';

import { spacing } from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

import Comment, { CommentProps } from '../Comment';

const Reply = styled.div<CommentProps>`
  margin-top: ${spacing(2)};

  &:first-child {
    margin-top: 0;
  }
`;

type CommentRepliesProps = CommentProps & {
  replies: CommentType[];
};

const CommentReplies: React.FC<CommentRepliesProps> = ({ replies, comment: _, ...props }) => {
  return (
    <div>
      {replies.map(reply => (
        <Reply as={Comment} key={reply.id} comment={reply} {...props} />
      ))}
    </div>
  );
};

export default CommentReplies;
