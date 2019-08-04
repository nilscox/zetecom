import React from 'react';

import { QuickReactionsCount } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import Text from 'src/components/common/Text';

type QuickReactionsProps = {
  icon: string;
  count: number;
};

const QuickReactions: React.FC<QuickReactionsProps> = ({ icon, count }) => {
  const { sizes: { small, medium, big } } = useTheme();

  return (
    <Flex mx={big} p={small} flexDirection="row" alignItems="center">
      <img src={icon} width={24} height={24} />
      <Box ml={medium}>
        <Text>{ count }</Text>
      </Box>
    </Flex>
  );
};

const VBreak: React.FC = () => {
  const { colors: { borderLight } } = useTheme();

  return (
    <div style={{ borderRight: `1px solid ${borderLight}` }} />
  );
};

type RepliesButtonProps = {
  repliesCount: number;
  displayReplies: boolean;
  onClick: () => void;
};

const RepliesButton: React.FC<RepliesButtonProps> = ({ repliesCount, displayReplies, onClick }) => {
  const { sizes: { big } } = useTheme();

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      ml={big}
    >
      <Button size="small" color="textLight" disabled={repliesCount === 0} onClick={onClick}>
        { repliesCount } réponse{ repliesCount > 1 ? 's' : '' }
      </Button>
      { repliesCount > 0 && (
        <Box ml={big}>
          <Text
            size="small"
            color="textLight"
            style={{
              transform: displayReplies ? 'rotate(90deg)' : '',
              transition: 'transform 200ms ease',
            }}
          >
            ▸
          </Text>
        </Box>
      ) }
    </Flex>
  );
};

type ReactionFooterProps = {
  quickReactionsCount: QuickReactionsCount;
  repliesCount: number;
  displayReplies: boolean;
  toggleReplies: () => void;
};

const ReactionFooter: React.FC<ReactionFooterProps> = ({
  quickReactionsCount,
  repliesCount,
  displayReplies,
  toggleReplies,
}) => {
  const { colors: { borderLight } } = useTheme();

  return (
    <Flex flexDirection="row" style={{ borderTop: `1px solid ${borderLight}` }}>
      <QuickReactions icon="/assets/images/1f44d.png" count={quickReactionsCount.approve} />
      <VBreak />
      <QuickReactions icon="/assets/images/1f44e.png" count={quickReactionsCount.refute} />
      <VBreak />
      <QuickReactions icon="/assets/images/1f9d0.png" count={quickReactionsCount.skeptic} />
      <VBreak />
      <RepliesButton repliesCount={repliesCount} displayReplies={displayReplies} onClick={toggleReplies} />
    </Flex>
  );
};

export default ReactionFooter;
