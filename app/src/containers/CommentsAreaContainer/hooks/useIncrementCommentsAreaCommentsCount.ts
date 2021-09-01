import useUpdatePartialQueries from 'src/hooks/useUpdatePartialQueries';
import { CommentsArea } from 'src/types/CommentsArea';

const useIncrementCommentsAreaCommentsCount = (commentsAreaId: number) => {
  const updatePartialQueries = useUpdatePartialQueries();

  return () => {
    updatePartialQueries<{ commentsArea: CommentsArea; notFound: boolean }>(
      ['commentsArea', { id: commentsAreaId }],
      (old) => ({
        notFound: false,
        commentsArea: {
          ...old.commentsArea,
          commentsCount: old.commentsArea.commentsCount + 1,
        },
      }),
    );
  };
};

export default useIncrementCommentsAreaCommentsCount;
