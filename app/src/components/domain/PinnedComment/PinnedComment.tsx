import React from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';
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
  onPin: (commentId: number) => void;
};

const ParentCommentsSummary: React.FC<ParentCommentsSummaryProps> = ({ comments: [comment, ...childs], onPin }) => (
  <div id={`comment-${comment.id}`} data-testid={'comment-ancestor'}>
    <StyledCommentHeader
      author={comment.author}
      edited={Boolean(comment.edited)}
      date={new Date(comment.edited || comment.date)}
      marginBottom={childs.length > 0}
      onPin={() => onPin(comment.id)}
    >
      <CommentSummaryText>{comment.text}</CommentSummaryText>
    </StyledCommentHeader>

    {childs.length > 0 && (
      <Nested>
        <ParentCommentsSummary comments={childs} onPin={onPin} />
      </Nested>
    )}
  </div>
);

const ParentComments = styled.div`
  margin: ${spacing(4, 0)};
`;

const PinInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PinInfoText = styled.p`
  flex: 1;
  font-style: oblique;
`;

type PinnedCommentProps = {
  CommentContainer: React.FC<{ comment: CommentType }>;
  parents: CommentType[];
  comment: CommentType;
  onPin: (commentId: number) => void;
  onUnpin: () => void;
};

const PinnedComment: React.FC<PinnedCommentProps> = ({ CommentContainer, parents, comment, onPin, onUnpin }) => {
  return (
    <>
      {parents.length > 0 && (
        <ParentComments>
          <ParentCommentsSummary comments={parents} onPin={onPin} />
        </ParentComments>
      )}

      <PinInfo>
        <PinInfoText>
          Commentaire épinglé{parents.length > 0 && <>, en réponse à {parents[parents.length - 1].author.nick}</>} :
        </PinInfoText>
        <Button onClick={onUnpin}>Désépingler</Button>
      </PinInfo>

      <CommentContainer comment={comment} />
    </>
  );
};

export default PinnedComment;
