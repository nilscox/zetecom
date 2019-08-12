/* eslint-disable max-lines */

import React, { useCallback, useState } from 'react';
import { Reaction, QuickReactionType, QuickReactionsCount } from 'src/types/Reaction';
import { postQuickReaction } from 'src/api/reaction';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import Text from 'src/components/common/Text';

const VBreak: React.FC = () => {
  const { colors: { borderLight } } = useTheme();

  return (
    <div style={{ borderRight: `1px solid ${borderLight}` }} />
  );
};

type QuickReactionProps = {
  icon: string;
  count: number;
  userQuickReaction?: boolean;
  onClick?: () => void;
};

const QuickReaction: React.FC<QuickReactionProps> = ({ icon, count, userQuickReaction, onClick }) => {
  const { sizes: { small, medium, big }, colors: { backgroundHeavy } } = useTheme();

  return (
    <Flex
      px={big}
      py={small}
      flexDirection="row"
      alignItems="center"
      style={{
        backgroundColor: userQuickReaction ? backgroundHeavy : 'transparent',
        cursor: onClick ? 'pointer' : 'initial',
      }}
      onClick={() => onClick && onClick()}
    >

      <img src={icon} width={24} height={24} />

      <Box ml={medium}>
        <Text>{ count }</Text>
      </Box>

    </Flex>
  );
};

const useQuickReactions = (
  reactionId: number,
  authorId: number,
  qrc: QuickReactionsCount,
  originalUserQuickReaction: QuickReactionType,
) => {
  const user = useCurrentUser();
  const [updatedQuickReaction, setUpdatedQuickReaction] = useState<QuickReactionType | undefined>();
  const userQuickReaction = updatedQuickReaction || originalUserQuickReaction;

  const quickReactions: { [key in QuickReactionType]: QuickReactionProps } = {
    approve: {
      icon: '/assets/images/1f44d.png',
      count: qrc.approve,
    },
    refute: {
      icon: '/assets/images/1f44e.png',
      count: qrc.refute,
    },
    skeptic: {
      icon: '/assets/images/1f9d0.png',
      count: qrc.skeptic,
    },
  };

  const updateUserQuickReaction = useCallback(async (type: QuickReactionType) => {
    try {
      const updated = await postQuickReaction(reactionId, type);
      setUpdatedQuickReaction(updated.userQuickReaction);
    } catch (e) {
      console.error(e);
    }
  }, [reactionId, postQuickReaction, setUpdatedQuickReaction]);

  const getQuickReactionProps = useCallback((type: QuickReactionType): QuickReactionProps => {
    const props = quickReactions[type];

    if (type === userQuickReaction)
      props.userQuickReaction = true;

    if (user && user.id !== authorId && type !== userQuickReaction)
      props.onClick = () => updateUserQuickReaction(type);

    if (updatedQuickReaction) {
      if (originalUserQuickReaction !== type && updatedQuickReaction === type)
        props.count++;
      if (originalUserQuickReaction === type && updatedQuickReaction !== type)
        props.count--;
    }

    return props;
  }, [quickReactions, userQuickReaction, originalUserQuickReaction, updatedQuickReaction]);

  return {
    approve: getQuickReactionProps(QuickReactionType.APPROVE),
    refute: getQuickReactionProps(QuickReactionType.REFUTE),
    skeptic: getQuickReactionProps(QuickReactionType.SKEPTIC),
  };
};

type QuickReactionsProps = {
  reaction: Reaction;
};

const QuickReactions: React.FC<QuickReactionsProps> = ({ reaction }) => {
  const props = useQuickReactions(
    reaction.id,
    reaction.author.id,
    reaction.quickReactionsCount,
    reaction.userQuickReaction,
  );

  return (
    <Flex>

      <QuickReaction {...props[QuickReactionType.APPROVE]} />
      <VBreak />

      <QuickReaction {...props[QuickReactionType.REFUTE]} />
      <VBreak />

      <QuickReaction {...props[QuickReactionType.SKEPTIC]} />
      <VBreak />

    </Flex>
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
  reaction: Reaction;
  displayReplies: boolean;
  toggleReplies: () => void | null;
  displayReplyForm: boolean;
  onReply: () => void;
};

const ReactionFooter: React.FC<ReactionFooterProps> = ({
  reaction,
  displayReplies,
  toggleReplies,
  displayReplyForm,
  onReply,
}) => {
  const { colors: { borderLight } } = useTheme();

  return (
    <Flex flexDirection="row" alignItems="center" style={{ borderTop: `1px solid ${borderLight}` }}>

      <QuickReactions
        reaction={reaction}
      />

      <RepliesButton repliesCount={reaction.repliesCount} displayReplies={displayReplies} onClick={toggleReplies} />

      <Flex flex={1} />
      <ReplyButton disabled={displayReplyForm} onReply={onReply} />

    </Flex>
  );
};

export default ReactionFooter;
