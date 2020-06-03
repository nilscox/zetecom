import React, { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/theme/Theme';
import { parseReaction, QuickReactionsCount, QuickReactionType, Reaction } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';

import QuickReaction, { QuickReactionProps } from './QuickReaction';

import approve from './images/approve.png';
import refute from './images/refute.png';
import skeptic from './images/skeptic.png';

import { Grid } from '@material-ui/core';

const VBreak: React.FC = () => {
  const { colors: { borderLight } } = useTheme();

  return (
    <div style={{ borderRight: `1px solid ${borderLight}` }} />
  );
};

const useQuickReactions = (
  reactionId: number,
  authorId: number,
  qrc: QuickReactionsCount,
  originalUserQuickReaction: QuickReactionType,
) => {
  const user = useCurrentUser();
  const [updatedQuickReaction, setUpdatedQuickReaction] = useState<QuickReactionType | null>();
  const userQuickReaction = typeof updatedQuickReaction !== 'undefined'
    ? updatedQuickReaction
    : originalUserQuickReaction;

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
    if (status(201))
      setUpdatedQuickReaction(updated.userQuickReaction);
  }, [status, updated, setUpdatedQuickReaction]);

  const quickReactions: { [key in QuickReactionType]: QuickReactionProps } = {
    approve: {
      icon: approve,
      count: qrc.approve,
      type: QuickReactionType.APPROVE,
    },
    refute: {
      icon: refute,
      count: qrc.refute,
      type: QuickReactionType.REFUTE,
    },
    skeptic: {
      icon: skeptic,
      count: qrc.skeptic,
      type: QuickReactionType.SKEPTIC,
    },
  };

  const getQuickReactionProps = (type: QuickReactionType): QuickReactionProps => {
    const props = quickReactions[type];

    if (type === userQuickReaction)
      props.userQuickReaction = true;

    if (user && user.id !== authorId)
      props.onClick = () => updateUserQuickReaction(type === userQuickReaction ? null : type);

    if (typeof updatedQuickReaction !== 'undefined') {
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
    <Grid container>

      <QuickReaction {...props[QuickReactionType.APPROVE]} />
      <VBreak />

      <QuickReaction {...props[QuickReactionType.REFUTE]} />
      <VBreak />

      <QuickReaction {...props[QuickReactionType.SKEPTIC]} />
      <VBreak />

    </Grid>
  );
};

export default QuickReactions;
