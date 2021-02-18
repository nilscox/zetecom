import React from 'react';

import styled from '@emotion/styled';

import { spacing } from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  row-gap: ${spacing(2)};
`;

type CommentsListProps = {
  CommentContainer: React.FC<{ comment: CommentType }>;
  comments: CommentType[];
};

const CommentsList: React.FC<CommentsListProps> = ({ CommentContainer, comments }) => (
  <Container>
    {comments.map(comment => (
      <CommentContainer key={comment.id} comment={comment} />
    ))}
  </Container>
);

export default CommentsList;
