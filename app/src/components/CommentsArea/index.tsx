import React, { useEffect } from 'react';

import Padding from 'src/components/Padding';
import { CommentsAreaProvider } from 'src/contexts/CommentsAreaContext';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { parseComment } from 'src/types/Comment';
import { CommentsArea } from 'src/types/CommentsArea';

import CommentsAreaComponent from './CommentsAreaComponent';

type CommentsAreaContainerProps = {
  commentsArea: CommentsArea;
};

const CommentsAreaContainer: React.FC<CommentsAreaContainerProps> = ({ commentsArea }) => {
  const commentsUrl = `/api/comments-area/${commentsArea?.id}/comments`;

  const [
    { loading: loadingComments, data, total },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
    fetchComments,
  ] = useAxiosPaginated(commentsUrl, parseComment, { manual: true });

  useEffect(() => {
    if (commentsArea) {
      fetchComments({ url: commentsUrl });
    }
  }, [commentsArea, fetchComments, commentsUrl]);

  const [comments, { prepend }] = useEditableDataset(data, 'set');

  const filters = { sort, setSort, search, setSearch, page, setPage, total };

  return (
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
  );
};

export default CommentsAreaContainer;
