import useUpdatePartialQueries from 'src/hooks/useUpdatePartialQueries';
import { CommentsArea } from 'src/types/CommentsArea';

const useIncrementCommentsAreaCommentsCount = () => {
  const updatePartialQueries = useUpdatePartialQueries();

  return () => {
    updatePartialQueries<{ commentsArea: CommentsArea; notFound: boolean }>(['commentsArea'], old => ({
      notFound: false,
      commentsArea: {
        ...old.commentsArea,
        commentsCount: old.commentsArea.commentsCount + 1,
      },
    }));
  };
};

export default useIncrementCommentsAreaCommentsCount;
