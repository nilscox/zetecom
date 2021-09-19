import React, { useEffect } from 'react';

import {
  fetchCommentsAreaById,
  selectCommentsArea,
  selectCommentsAreaNotFound,
  selectIsFetchingCommentsArea,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import {
  setCommentsAreaNotFound,
  setCurrentCommentsArea,
} from '~/../../app-core/src/modules/commentsArea/actions/commentsAreaActions';
import { CommentsArea } from '~/components/domain/CommentsArea/CommentsArea';
import { CommentsAreaOutline } from '~/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import { Async } from '~/components/layout/Async/Async';
import { Box } from '~/components/layout/Box/Box';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { useAppSelector } from '~/hooks/useAppSelector';

type CommentsAreaViewProps = RouteComponentProps<{ commentsAreaId: string }>;

export const CommentsAreaView: React.FC<CommentsAreaViewProps> = ({ match }) => {
  const { commentsAreaId } = match.params;

  const dispatch = useDispatch();

  const commentsArea = useAppSelector(selectCommentsArea, commentsAreaId);
  const loading = useAppSelector(selectIsFetchingCommentsArea);
  const notFound = useAppSelector(selectCommentsAreaNotFound);

  useEffect(() => {
    if (commentsArea) {
      dispatch(setCurrentCommentsArea(commentsArea));
    }

    dispatch(fetchCommentsAreaById(commentsAreaId));
    dispatch(setCommentsAreaNotFound(false));
  }, [commentsAreaId]);

  if (notFound) {
    return <Fallback>La zone de commentaire n'a pas pu être trouvée.</Fallback>;
  }

  if (!commentsArea) {
    return null;
  }

  return (
    <Async
      loading={loading}
      render={() => (
        <>
          <Box marginY={5}>
            <CommentsAreaOutline commentsAreaId={commentsAreaId} externalLink link={commentsArea.information.url} />
          </Box>
          <CommentsArea commentsAreaId={commentsAreaId} />
        </>
      )}
    />
  );
};
