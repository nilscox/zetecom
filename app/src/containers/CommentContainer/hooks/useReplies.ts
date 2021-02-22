import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Comment as CommentType } from 'src/types/Comment';

const useReplies = (comment: CommentType) => {
  const [fetchedReplies, { loading }, fetchReplies] = useAxiosPaginated<CommentType>(
    `/api/comment/${comment.id}/replies`,
    { manual: true },
  );

  const [repliesDataset, { prepend }] = useEditableDataset(fetchedReplies?.items);

  return [repliesDataset, { loading, prepend }, fetchReplies] as const;
};

export default useReplies;
