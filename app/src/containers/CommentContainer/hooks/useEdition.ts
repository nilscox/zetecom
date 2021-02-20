import { useCallback, useEffect } from 'react';

import useAxios from 'src/hooks/useAxios';
import { Comment as CommentType } from 'src/types/Comment';

import { SetComment } from '../CommentContainer';

const useEdition = (comment: CommentType, setComment: SetComment) => {
  const [edited, { loading }, onEdit] = useAxios<CommentType>(
    {
      method: 'PUT',
      url: `/api/comment/${comment.id}`,
    },
    { manual: true },
  );

  useEffect(() => {
    setComment(comment => ({ ...comment, ...edited }));
  }, [edited, setComment]);

  const handleEdit = useCallback((text: string) => onEdit({ data: { text } }), [onEdit]);

  return [{ submittingEdition: loading }, handleEdit] as const;
};

export default useEdition;
