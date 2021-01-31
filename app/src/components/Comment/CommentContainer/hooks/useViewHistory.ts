import { Comment } from 'src/types/Comment';

const useViewHistory = (comment: Comment) => {
  const historyUrl = `/integration/comment/${comment.id}/history`;

  const viewHistory = () => {
    window.open(historyUrl, '_blank', 'width=1000,height=750,resizable=yes');
  };

  return viewHistory;
};

export default useViewHistory;
