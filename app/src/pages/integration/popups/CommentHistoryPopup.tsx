import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { plainToClass } from 'class-transformer';
import { RouteComponentProps } from 'react-router';

import AsyncContent from 'src/components/AsyncContent';
import DiffView from 'src/components/DiffView/DiffView';
import useAxios from 'src/hooks/use-axios';
import { Comment, Message } from 'src/types/Comment';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    padding: spacing(4),
  },
}));

type CommentHistoryPopupProps = RouteComponentProps<{ id: string }>;

const CommentHistoryPopup: React.FC<CommentHistoryPopupProps> = ({ match }) => {
  const commentId = match.params.id;

  const [{ data: comment, loading: commentLoading, error: commentError }] = useAxios(
    `/api/comment/${commentId}`,
    undefined,
    Comment,
  );

  const [{ raw, loading: historyLoading, error: historyError }] = useAxios(`/api/comment/${commentId}/history`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const history: Message[] = raw?.map((data: any) => plainToClass(Message, data));

  const classes = useStyles();

  if (commentError) {
    throw commentError;
  }

  if (historyError) {
    throw historyError;
  }

  return (
    <AsyncContent
      loading={commentLoading || historyLoading}
      render={() => <DiffView className={classes.container} author={comment.author} history={history} />}
    />
  );
};

export default CommentHistoryPopup;
