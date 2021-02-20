/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';

import { color, domain, fontSize, spacing, transition } from 'src/theme';

import { ReactionType } from './ReactionType';

const Container = styled.button`
  border: none;
  padding: ${spacing(0.5, 2)};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: inherit;
  cursor: pointer;

  transition: ${transition('fast', 'background-color')};

  &:hover {
    background-color: ${color('light')};
  }

  &:disabled {
    background-color: initial;
    cursor: unset;
  }
`;

const Icon = styled.span`
  font-size: ${domain('reactionFontSize')};
`;

const Count = styled.span`
  font-size: ${fontSize('large')};
  margin-left: ${spacing(1)};
`;

const reactionIcons: Record<ReactionType, string> = {
  [ReactionType.like]: '❤️',
  [ReactionType.approve]: '👍',
  [ReactionType.think]: '🧠',
  [ReactionType.disagree]: '🤨',
  [ReactionType.dontUnderstand]: '❓',
};

const reactionLabels: Record<ReactionType, string> = {
  [ReactionType.like]: "J'aime",
  [ReactionType.approve]: "Je suis plutôt d'accord",
  [ReactionType.think]: 'Ça me fait réfléchir',
  [ReactionType.disagree]: "Je ne suis pas d'accord",
  [ReactionType.dontUnderstand]: 'Je ne comprends pas',
};

type ReactionProps = {
  type: ReactionType;
  count: number;
  isUserReaction: boolean;
  onClick?: () => void;
};

const Reaction: React.FC<ReactionProps> = ({ type, count, isUserReaction, onClick }) => (
  <Container
    className={clsx('reaction', isUserReaction && 'user-reaction')}
    disabled={!onClick}
    title={reactionLabels[type]}
    onClick={onClick}
    css={theme => ({ backgroundColor: isUserReaction ? theme.domain.userReactionColor : undefined })}
    data-testid={`reaction-${type}`}
  >
    <Icon>{reactionIcons[type]}</Icon>
    <Count>{count}</Count>
  </Container>
);

export default Reaction;
