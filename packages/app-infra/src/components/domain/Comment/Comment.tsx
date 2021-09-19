import styled from '@emotion/styled';
import {
  closeEditionForm,
  closeReplyForm,
  Comment as CommentType,
  createReply,
  editComment,
  selectComment,
  selectCommentsSearchQuery,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { CommentForm } from '~/components/domain/CommentForm/CommentForm';
import { Markdown } from '~/components/elements/Markdown/Markdown';
import { Box } from '~/components/layout/Box/Box';
import { Collapse } from '~/components/layout/Collapse/Collapse';
import { Grid } from '~/components/layout/Grid/Grid';
import { Nested } from '~/components/layout/Nested/Nested';
import { useAppSelector } from '~/hooks/useAppSelector';
import { border, radius } from '~/theme';

import { CommentFooter } from './CommentFooter';
import { CommentHeader } from './CommentHeader';

export { CommentFooterContainer } from './CommentFooter';
export { CommentHeaderContainer } from './CommentHeader';

type CommentProps = {
  commentId: string;
};

export const Comment: React.FC<CommentProps> = ({ commentId }) => (
  <div id={`comment-${commentId}`} data-testid="comment">
    <CommentOrForm commentId={commentId} />
    <Replies commentId={commentId} />
  </div>
);

export const CommentContainer = styled.div`
  border: ${border()};
  border-radius: ${radius()};
  /* box-shadow: rgba(50, 50, 50, 0.2) 0px 1px 3px 0px; */
`;

type CommentOrFormProps = {
  commentId: string;
};

const CommentOrForm: React.FC<CommentOrFormProps> = ({ commentId }) => {
  const dispatch = useDispatch();
  const { text, isEditing, isSubmittingEdition } = useAppSelector(selectComment, commentId);

  if (isEditing) {
    return (
      <CommentForm
        placeholder="Éditez votre message..."
        initialValue={text}
        isLoading={isSubmittingEdition}
        onSubmit={(text) => dispatch(editComment(commentId, text))}
        closeButtonTitle="Fermer le formulaire d'édition"
        onClose={() => dispatch(closeEditionForm(commentId))}
      />
    );
  }

  return (
    <CommentContainer>
      <CommentHeader commentId={commentId} />
      <CommentBody commentId={commentId} />
      <CommentFooter commentId={commentId} />
    </CommentContainer>
  );
};

type CommentBodyProps = {
  commentId: string;
};

const CommentBody: React.FC<CommentBodyProps> = ({ commentId }) => {
  const { text } = useAppSelector(selectComment, commentId);
  const searchQuery = useAppSelector(selectCommentsSearchQuery);

  return (
    <Box padding={2}>
      <Markdown markdown={text} highlight={searchQuery} />
    </Box>
  );
};

type RepliesProps = {
  commentId: string;
};

const Replies: React.FC<RepliesProps> = ({ commentId }) => {
  const dispatch = useDispatch();

  const comment = useAppSelector(selectComment, commentId);
  const { author, areRepliesOpen, isFetchingReplies, isReplyFormOpen, isSubmittingReply, replies } = comment;

  return (
    <Collapse open={areRepliesOpen && !isFetchingReplies}>
      <Nested marginTop={3}>
        <Collapse open={isReplyFormOpen}>
          <Box marginBottom={3}>
            <CommentForm
              placeholder={`Répondez à ${author.nick}...`}
              isLoading={isSubmittingReply}
              onSubmit={(text) => dispatch(createReply(commentId, text))}
              closeButtonTitle="Fermer le formulaire de réponse"
              onClose={() => dispatch(closeReplyForm(commentId))}
            />
          </Box>
        </Collapse>

        <CommentsList comments={replies} />
      </Nested>
    </Collapse>
  );
};

type CommentsListProps = {
  comments: CommentType[];
};

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => (
  <Grid gap={3}>
    {comments.map((comment) => (
      <Comment key={comment.id} commentId={comment.id} />
    ))}
  </Grid>
);
