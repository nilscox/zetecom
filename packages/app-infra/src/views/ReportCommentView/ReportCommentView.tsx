import React, { useEffect } from 'react';

import { fetchComment, selectComment, selectIsFetchingComment } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Async } from '~/components/layout/Async/Async';
import { Box } from '~/components/layout/Box/Box';
import { useAppSelector } from '~/hooks/useAppSelector';

import { ReportComment } from './ReportComment';

type ReportCommentViewProps = RouteComponentProps<{ commentId: string }>;

export const ReportCommentView: React.FC<ReportCommentViewProps> = ({ match }) => {
  const { commentId } = match.params;

  const dispatch = useDispatch();

  const comment = useAppSelector(selectComment, commentId);
  const loading = useAppSelector(selectIsFetchingComment);

  useEffect(() => {
    dispatch(fetchComment(commentId));
  }, [commentId]);

  if (!loading && !comment) {
    return null;
  }

  return (
    <Box marginX={4} marginY={5}>
      <Async loading={loading} render={() => <ReportComment comment={comment} />} />
    </Box>
  );
};
