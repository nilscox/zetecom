import useUpdatePartialQueries from 'src/hooks/useUpdatePartialQueries';
import { Comment } from 'src/types/Comment';
import { Paginated } from 'src/types/Paginated';
import replace from 'src/utils/replace';

const useUpdatedCachedComment = () => {
  const updatePartialQueries = useUpdatePartialQueries();

  return (updated: Comment) => {
    updatePartialQueries<Paginated<Comment>>(['comments'], old => {
      return { ...old, items: replace(old.items, ({ id }) => id === updated.id, updated) };
    });

    updatePartialQueries<Paginated<Comment>>(['commentReplies'], old => {
      return { ...old, items: replace(old.items, ({ id }) => id === updated.id, updated) };
    });
  };
};

export default useUpdatedCachedComment;
