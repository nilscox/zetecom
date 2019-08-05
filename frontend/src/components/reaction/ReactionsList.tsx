import React from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import Break from 'src/components/common/Break';

import ReactionContainer from './ReactionContainer';

type ReactionsListProps = {
  subject: Subject;
  reactions: Reaction[];
};

const ReactionsList: React.FC<ReactionsListProps> = ({ subject, reactions }) => {
  const { sizes: { big } } = useTheme();

  return (
    <>
      { reactions.map((r, n) => (
        <div key={r.id}>
          <ReactionContainer subject={subject} reaction={r} />
          { n < reactions.length - 1 && <Break size={big} /> }
        </div>
      )) }
    </>
  );
};

export default ReactionsList;
