import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Comment } from 'src/types/Comment';

const useReplies = (parent: Comment) => {
  const [{ data, total, loading, error }, , , { page, setPage }, fetch] = useAxiosPaginated(
    `/api/comment/${parent.id}/replies`,
    { manual: true },
    Comment,
  );

  if (error) {
    throw error;
  }

  const [replies, { prepend }] = useEditableDataset(data, 'append');

  const getRemainingRepliesCount = () => {
    if (!data || !replies || total === undefined) {
      return;
    }

    return total - replies.length;
  };

  const fetchMoreReplies = () => {
    if (!replies) {
      fetch();
    } else {
      setPage(page + 1);
    }
  };

  return [
    {
      replies,
      remainingRepliesCount: getRemainingRepliesCount(),
      loading,
    },
    {
      fetchMoreReplies,
      addReply: prepend,
    },
  ] as const;
};

export default useReplies;
