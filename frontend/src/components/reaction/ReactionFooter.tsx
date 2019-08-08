import React from 'react';

import { QuickReactionsCount } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';
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
    <Button
      size="small"
      color="textLight"
      disabled={!onClick || repliesCount === 0}
      onClick={onClick}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        ml={big}
      >
        { repliesCount } réponse{ repliesCount > 1 ? 's' : '' }
        { repliesCount > 0 && (
          <Box ml={big}>
            <Text
              size="small"
              style={{
                transform: displayReplies ? 'rotate(90deg)' : '',
                transition: 'transform 200ms ease',
                color: 'inherit',
              }}
            >
              ▸
            </Text>
          </Box>
        ) }
      </Flex>
    </Button>
  );
};

type ReplyButtonProps = {
  disabled: boolean;
  onReply: () => void;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ disabled, onReply }) => {
  const { sizes: { big } } = useTheme();
  const user = useCurrentUser();

  if (!user)
    return null;

  return (
    <Box mr={big}>
      <Button disabled={disabled} onClick={onReply}>
        Répondre
      </Button>
    </Box>
  );
};

type ReactionFooterProps = {
  quickReactionsCount: QuickReactionsCount;
  repliesCount: number;
  displayReplies: boolean;
  toggleReplies: () => void | null;
  displayReplyForm: boolean;
  onReply: () => void;
};

const ReactionFooter: React.FC<ReactionFooterProps> = ({
  quickReactionsCount,
  repliesCount,
  displayReplies,
  toggleReplies,
  displayReplyForm,
  onReply,
}) => {
  const { colors: { borderLight } } = useTheme();

  return (
    <Flex flexDirection="row" alignItems="center" style={{ borderTop: `1px solid ${borderLight}` }}>
      <QuickReactions icon="/assets/images/1f44d.png" count={quickReactionsCount.approve} />
      <VBreak />
      <QuickReactions icon="/assets/images/1f44e.png" count={quickReactionsCount.refute} />
      <VBreak />
      <QuickReactions icon="/assets/images/1f9d0.png" count={quickReactionsCount.skeptic} />
      <VBreak />
      <RepliesButton repliesCount={repliesCount} displayReplies={displayReplies} onClick={toggleReplies} />
      <Flex flex={1} />
      <ReplyButton disabled={displayReplyForm} onReply={onReply} />
    </Flex>
  );
};

export default ReactionFooter;
