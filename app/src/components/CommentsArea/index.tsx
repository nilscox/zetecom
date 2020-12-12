import React, { useEffect, useState } from 'react';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Comment } from 'src/types/Comment';
import { CommentsArea } from 'src/types/CommentsArea';

import useUpdateEffect from '../../hooks/use-update-effect';

import CommentsAreaComponent from './CommentsAreaComponent';

type CommentsAreaContainerProps = {
  showDescription?: boolean;
  commentsArea: CommentsArea;
  linkToInformation?: boolean;
};

const CommentsAreaContainer: React.FC<CommentsAreaContainerProps> = ({
  showDescription,
  commentsArea,
  linkToInformation,
}) => {
  const commentsUrl = `/api/comment?commentsAreaId=${commentsArea?.id}`;
  const [loading, setLoading] = useState(false);

  const [
    { data, total },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
    fetchComments,
  ] = useAxiosPaginated(commentsUrl, { manual: true }, Comment);

  useEffect(() => {
    if (commentsArea) {
      setLoading(true);
      fetchComments({ url: commentsUrl });
    }
  }, [commentsArea, fetchComments, commentsUrl]);

  const [comments, { prepend }] = useEditableDataset(data, 'set');

  useUpdateEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [comments]);

  const filters = { sort, setSort, search, setSearch, page, setPage, total };

  return (
    <CommentsAreaComponent
      commentsArea={commentsArea}
      comments={comments}
      showDescription={showDescription}
      loadingComments={loading}
      filters={filters}
      onRootCommentCreated={prepend}
      linkToInformation={linkToInformation}
    />
  );
};

export default CommentsAreaContainer;
