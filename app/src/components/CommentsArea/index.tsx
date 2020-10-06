import React, { useEffect } from 'react';

import AsyncContent from 'src/components/AsyncContent';
import Padding from 'src/components/Padding';
import { CommentsAreaProvider } from 'src/contexts/CommentsAreaContext';
import useAxios from 'src/hooks/use-axios';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { parseComment } from 'src/types/Comment';
import { CommentsArea as CommentsAreaType, parseCommentsArea } from 'src/types/CommentsArea';

import CommentsAreaComponent from './CommentsAreaComponent';

const useFetchCommentsArea = (id: number) => {
  const result = useAxios<CommentsAreaType>(`/api/comments-area/${id}`, parseCommentsArea);
  const [{ error }] = result;

  if (error) {
    throw error;
  }

  return result;
};

const CommentsAreaContainer: React.FC<{ commentsAreaId: number }> = ({ commentsAreaId }) => {
  const [{ loading: loadingCommentsArea, data: commentsArea }] = useFetchCommentsArea(commentsAreaId);

  const [
    { loading: loadingComments, data, total },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
    fetchComments,
  ] = useAxiosPaginated(`/api/comments-area/${commentsArea?.id}/comments`, parseComment, { manual: true });

  useEffect(() => {
    if (commentsArea) {
      fetchComments({ url: `/api/comments-area/${commentsArea.id}/comments` });
    }
  }, [commentsArea]);

  const [comments, { prepend }] = useEditableDataset(data, 'set');

  const filters = { sort, setSort, search, setSearch, page, setPage, total };

  return (
    <AsyncContent
      loading={loadingCommentsArea}
      render={() => (
        <CommentsAreaProvider value={commentsArea}>
          <Padding bottom>
            <CommentsAreaComponent
              commentsArea={commentsArea}
              comments={comments}
              loadingComments={loadingComments}
              filters={filters}
              onRootCommentCreated={prepend}
            />
          </Padding>
        </CommentsAreaProvider>
      )}
    />
  );
};

export default CommentsAreaContainer;
