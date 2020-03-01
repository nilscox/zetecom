import React from 'react';

import Break from 'src/components/common/Break';
import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';

import ReactionContainer from './ReactionContainer';

type ReactionsListProps = {
  reactions: Reaction[];
  onEdited: (reaction: Reaction) => void;
};

const ReactionsList: React.FC<ReactionsListProps> = ({ reactions, onEdited }) => {
  const { sizes: { big } } = useTheme();

  if (!reactions.length)
    return null;

  return (
    <div className="reactions-list">
      { reactions.map((r, n) => (
        <div key={r.id}>
          <ReactionContainer reaction={r} onEdited={onEdited} />
          { n < reactions.length - 1 && <Break size={big} /> }
        </div>
      )) }
    </div>
  );
};

export default ReactionsList;
