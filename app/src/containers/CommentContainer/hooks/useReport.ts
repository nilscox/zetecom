import { useCallback } from 'react';

import { Comment } from 'src/types/Comment';

const useReport = (comment: Comment) => {
  return useCallback(() => {
    window.open(`/commentaire/${comment.id}/signaler`, '_blank', 'width=600,height=800,resizable=no');
  }, [comment]);
};

export default useReport;
