/* eslint-disable max-lines */

import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';

import { Reaction, QuickReactionType, QuickReactionsCount, parseReaction } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import Text from 'src/components/common/Text';
import useAxios from 'src/hooks/use-axios';

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
  const [updatedQuickReaction, setUpdatedQuickReaction] = useState<QuickReactionType | null>(null);
  const userQuickReaction = updatedQuickReaction || originalUserQuickReaction;

  const opts: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/reaction/${reactionId}/quick-reaction`,
  };

  const [{ data: updated, error, status }, post] = useAxios(opts, parseReaction, { manual: true });

  if (error)
    throw error;

  const updateUserQuickReaction = (type: QuickReactionType) => {
    post({
      data: {
        reactionId,
        type: type ? type.toUpperCase() : null,
      },
    });

    // optimist update
    setUpdatedQuickReaction(type);
  };

  useEffect(() => {
    if (status(200))
      setUpdatedQuickReaction(updated.userQuickReaction);
  }, [status, updated, setUpdatedQuickReaction]);

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

  const getQuickReactionProps = (type: QuickReactionType): QuickReactionProps => {
    const props = quickReactions[type];

    if (type === userQuickReaction)
      props.userQuickReaction = true;

    if (user && user.id !== authorId)
      props.onClick = () => updateUserQuickReaction(type === userQuickReaction ? null : type);

    if (updatedQuickReaction) {
      if (originalUserQuickReaction !== type && updatedQuickReaction === type)
        props.count++;
      if (originalUserQuickReaction === type && updatedQuickReaction !== type)
        props.count--;
    }

    return props;
  };

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
            <div
              style={{
                transform: displayReplies ? 'rotate(90deg)' : '',
                transition: 'transform 200ms ease',
                color: 'inherit',
              }}
            >
              ▸
            </div>
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

const useBookmark = (reactionId: number, bookmarked: boolean) => {
  const [updatedBookmark, setUpdatedBookmark] = useState(bookmarked);

  const opts: AxiosRequestConfig = {
    url: `/api/bookmark/${reactionId}`,
  };

  const [{ loading, error, status }, toggleBookmark] = useAxios(opts, undefined, { manual: true });

  if (error)
    throw error;

  const handleToggleBookmark = () => {
    if (loading)
      return;

    toggleBookmark({ method: updatedBookmark ? 'DELETE' : 'POST' });

    // optimist update
    setUpdatedBookmark(!updatedBookmark);
  };

  useEffect(() => {
    if (status(201))
      setUpdatedBookmark(true);
    else if (status(204))
      setUpdatedBookmark(false);
  }, [status]);

  return {
    bookmarked: updatedBookmark,
    loading,
    toggleBookmark: handleToggleBookmark,
  };
};

type BookmarkButtonProps = {
  reaction: Reaction;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ reaction }) => {
  const user = useCurrentUser();
  const { bookmarked, toggleBookmark } = useBookmark(reaction.id, reaction.bookmarked);

  if (!user)
    return null;

  return (
    <IconButton size="small" onClick={toggleBookmark}>
      { bookmarked
        ? <StarIcon fontSize="small" color="primary" />
        : <StarIcon fontSize="small" color="disabled" />
      }
    </IconButton>
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
      <BookmarkButton reaction={reaction} />
      <ReplyButton disabled={displayReplyForm} onReply={onReply} />

    </Flex>
  );
};

export default ReactionFooter;
