import { useEffect } from 'react';

import useAxios from 'src/hooks/useAxios';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Comment } from 'src/types/Comment';

const useComments = (commentsAreaId: number) => {
  const [comments, result] = useAxiosPaginated<Comment>({
    url: '/api/comment',
    params: { commentsAreaId },
  });

  const [commentsDataset, { prepend }] = useEditableDataset(comments?.items, 'set');

  const [createdComment, { loading: submitting }, onSubmit] = useAxios<Comment>(
    { method: 'POST', url: '/api/comment' },
    { manual: true },
  );

  useEffect(() => {
    if (createdComment) {
      prepend(createdComment);
    }
  }, [createdComment, prepend]);

  return [commentsDataset, { ...result, total: comments?.total, submitting, onSubmit }] as const;
};

export default useComments;
