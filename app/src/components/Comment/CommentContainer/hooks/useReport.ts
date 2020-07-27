import { Comment } from 'src/types/Comment';

const useReport = (comment: Comment) => {
  const reportUrl = `/integration/comment/${comment.id}/report`;

  const report = () => {
    window.open(reportUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return report;
};

export default useReport;
