import React, { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useCurrentUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/theme/Theme';
import { parseComment, ReactionsCount, ReactionType, Comment } from 'src/types/Comment';
import { trackSetReaction } from 'src/utils/track';

import Reaction, { ReactionProps } from './Reaction';

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

const useReactions = (
  commentId: number,
  authorId: number,
  qrc: ReactionsCount,
  originalUserReaction: ReactionType,
) => {
  const user = useCurrentUser();
  const [updatedReaction, setUpdatedReaction] = useState<ReactionType | null>();
  const userReaction = user && (updatedReaction || originalUserReaction);

  const opts: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/reaction/${commentId}/quick-reaction`,
  };

  const [{ data: updated, error, status }, post] = useAxios(opts, parseComment, { manual: true });

  if (error)
    throw error;

  const updateUserReaction = (type: ReactionType) => {
    post({
      data: {
        commentId,
        type: type ? type.toUpperCase() : null,
      },
    });

    // optimist update
    setUpdatedReaction(type);
  };

  useEffect(() => {
    if (status(201)) {
      trackSetReaction();
      setUpdatedReaction(updated.userReaction);
    }
  }, [status, updated, setUpdatedReaction]);

  const reactions: { [key in ReactionType]: ReactionProps } = {
    APPROVE: {
      icon: approve,
      count: qrc.APPROVE,
      type: ReactionType.APPROVE,
    },
    REFUTE: {
      icon: refute,
      count: qrc.REFUTE,
      type: ReactionType.REFUTE,
    },
    SKEPTIC: {
      icon: skeptic,
      count: qrc.SKEPTIC,
      type: ReactionType.SKEPTIC,
    },
  };

  const getReactionProps = (type: ReactionType): ReactionProps => {
    const props = reactions[type];

    if (type === userReaction)
      props.userReaction = true;

    if (user?.id !== authorId)
      props.onClick = () => updateUserReaction(type === userReaction ? null : type);

    if (typeof updatedReaction !== 'undefined') {
      if (originalUserReaction !== type && updatedReaction === type)
        props.count++;
      if (originalUserReaction === type && updatedReaction !== type)
        props.count--;
    }

    return props;
  };

  return {
    APPROVE: getReactionProps(ReactionType.APPROVE),
    REFUTE: getReactionProps(ReactionType.REFUTE),
    SKEPTIC: getReactionProps(ReactionType.SKEPTIC),
  };
};

type ReactionsProps = {
  comment: Comment;
};

const Reactions: React.FC<ReactionsProps> = ({ comment }) => {
  const props = useReactions(
    comment.id,
    comment.author.id,
    comment.reactionsCount,
    comment.userReaction,
  );

  return (
    <Grid container>

      <Reaction {...props[ReactionType.APPROVE]} />
      <VBreak />

      <Reaction {...props[ReactionType.REFUTE]} />
      <VBreak />

      <Reaction {...props[ReactionType.SKEPTIC]} />
      <VBreak />

    </Grid>
  );
};

export default Reactions;
