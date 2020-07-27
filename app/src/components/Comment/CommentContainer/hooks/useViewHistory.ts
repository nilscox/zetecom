import { Comment } from 'src/types/Comment';

const useViewHistory = (comment: Comment) => {
  const historyUrl = `/integration/comment/${comment.id}/history`;

  const viewHistory = () => {
    window.open(historyUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return viewHistory;
};

export default useViewHistory;
