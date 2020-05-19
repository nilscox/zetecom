import { Reaction } from 'src/types/Reaction';

const useReport = (reaction: Reaction) => {
  const reportUrl = `/integration/reaction/${reaction.id}/report`;

  const report = () => {
    window.open(reportUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return report;
};

export default useReport;
