import React from 'react';

import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';

import ReactionHeader from './ReactionHeader';
import ReactionBody from './ReactionBody';

type ReactionProps = {
  reaction: Reaction;
};

const ReactionComponent: React.FC<ReactionProps> = ({ reaction }) => {
  const { colors: { border } } = useTheme();

  return (
    <div id={`reaction-${reaction.id}`} style={{ border: `1px solid ${border}` }}>
      <ReactionHeader {...reaction} />
      <ReactionBody text={reaction.text} />
    </div>
  );
};

export default ReactionComponent;
