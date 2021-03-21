import React from 'react';

import styled from '@emotion/styled';

import Nested from 'src/components/layout/Nested/Nested';
import { borderRadius, color, spacing } from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

import { CommentHeader } from '../Comment/Comment';

const StyledCommentHeader = styled(CommentHeader)<{ marginBottom?: boolean }>`
  margin-bottom: ${({ marginBottom, theme }) => theme.spacings[marginBottom ? 2 : 0]};
  border: 1px solid ${color('border')};
  border-radius: ${borderRadius(1)};
`;

const CommentSummaryText = styled.div`
  margin: 0 ${spacing(4)};
  line-height: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type ParentCommentsSummaryProps = {
  comments: CommentType[];
};

const ParentCommentsSummary: React.FC<ParentCommentsSummaryProps> = ({ comments: [comment, ...childs] }) => (
  <>
    <StyledCommentHeader
      author={comment.author}
      edited={Boolean(comment.edited)}
      date={new Date(comment.edited || comment.date)}
      marginBottom={childs.length > 0}
    >
      <CommentSummaryText>{comment.text}</CommentSummaryText>
    </StyledCommentHeader>

    {childs.length > 0 && (
      <Nested>
        <ParentCommentsSummary comments={childs} />
      </Nested>
    )}
  </>
);

const ParentComments = styled.div`
  margin-bottom: ${spacing(4)};
`;

const InResponseTo = styled.p`
  font-style: oblique;
`;

type PinnedCommentProps = {
  CommentContainer: React.FC<{ comment: CommentType }>;
  parents: CommentType[];
  comment: CommentType;
};

const PinnedComment: React.FC<PinnedCommentProps> = ({ CommentContainer, parents, comment }) => {
  return (
    <>
      <ParentComments>
        <ParentCommentsSummary comments={parents} />
      </ParentComments>

      <InResponseTo>En réponse à {parents[parents.length - 1].author.nick} :</InResponseTo>
      <CommentContainer comment={comment} />
    </>
  );
};

export default PinnedComment;
