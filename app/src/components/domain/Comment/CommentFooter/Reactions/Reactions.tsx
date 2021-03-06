import React from 'react';

import styled from '@emotion/styled';

import { color } from 'src/theme';

import Reaction from './Reaction';
import { ReactionType } from './ReactionType';

const ReactionsContainer = styled.div`
  display: flex;
  flex-direction: row;

  .reaction {
    border-right: 1px solid ${color('border')};
  }
`;

type ReactionsProps = {
  counts: Record<ReactionType, number>;
  userReaction?: ReactionType | null;
  onSetReaction?: (reaction: ReactionType | null) => void;
};

const Reactions: React.FC<ReactionsProps> = ({ counts, userReaction, onSetReaction }) => (
  <ReactionsContainer>
    {Object.values(ReactionType).map(type => (
      <Reaction
        key={type}
        type={type}
        count={counts[type]}
        isUserReaction={userReaction === type}
        onClick={onSetReaction ? () => onSetReaction(userReaction === type ? null : type) : undefined}
      />
    ))}
  </ReactionsContainer>
);

export default Reactions;
