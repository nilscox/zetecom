import { Reaction } from 'src/types/Reaction';

const useViewHistory = (reaction: Reaction) => {
  const historyUrl = `/integration/reaction/${reaction.id}/history`;

  const viewHistory = () => {
    window.open(historyUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return viewHistory;
};

export default useViewHistory;
