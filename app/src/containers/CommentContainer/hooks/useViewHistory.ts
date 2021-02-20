import { useCallback } from 'react';

import { Comment } from 'src/types/Comment';

const useViewHistory = (comment: Comment) => {
  return useCallback(() => {
    window.open(`/commentaire/${comment.id}/historique`, '_blank', 'width=1000,height=750,resizable=no');
  }, [comment]);
};

export default useViewHistory;
