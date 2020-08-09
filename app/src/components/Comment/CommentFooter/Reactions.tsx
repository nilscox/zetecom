import React, { useCallback, useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/theme/Theme';
import { Comment, parseComment, ReactionsCount, ReactionType } from 'src/types/Comment';
import { trackSetReaction } from 'src/utils/track';

import Reaction from './Reaction';

import { Grid } from '@material-ui/core';

const VBreak: React.FC = () => {
  const { colors: { borderLight } } = useTheme();

  return (
    <div style={{ borderRight: `1px solid ${borderLight}` }} />
  );
};

const useUpsertReaction = (commentId: number, onUpserted: (updatedComment: Comment) => void) => {
  const opts: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/comment/${commentId}/reaction`,
  };

  const [{ data, error, status }, post] = useAxios(opts, parseComment, { manual: true });

  if (error)
    throw error;

  useEffect(() => {
    if (status(201))
      onUpserted(data);
  }, [status, data, onUpserted]);

  const onUpsert = (type: ReactionType | null) => {
    post({
      data: {
        commentId,
        type: type ? type.toUpperCase() : null,
      },
    });
  };

  return onUpsert;
};

const useReactionsCounts = (comment: Comment) => {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(comment.userReaction);
  const [counts, setCounts] = useState<ReactionsCount>(comment.reactionsCount);

  const onUpserted = useCallback((updatedComment: Comment) => {
    setCounts(updatedComment.reactionsCount);
    setUserReaction(updatedComment.userReaction);
    trackSetReaction();
  }, []);

  const upsertReaction = useUpsertReaction(comment.id, onUpserted);

  const isUserReaction = (type: ReactionType) => type === userReaction;

  const onUpdate = (type: ReactionType) => {
    setCounts({
      ...counts,
      ...(userReaction && { [userReaction]: counts[userReaction] - 1 }),
      ...(type && { [type]: counts[type] + (type !== null ? 1 : 0) }),
    });

    setUserReaction(type);
    upsertReaction(type);
  };

  return {
    counts,
    isUserReaction,
    onUpdate,
  };
};

type ReactionsProps = {
  comment: Comment;
};

const Reactions: React.FC<ReactionsProps> = ({ comment }) => {
  const { counts, isUserReaction, onUpdate } = useReactionsCounts(comment);

  return (
    <Grid container>

      {[ReactionType.APPROVE, ReactionType.REFUTE, ReactionType.SKEPTIC].map(type => (
        <React.Fragment key={type}>
          <Reaction
            type={type}
            count={counts[type]}
            userReaction={isUserReaction(type)}
            onUpdate={onUpdate}
          />
          <VBreak />
        </React.Fragment>
      ))}

    </Grid>
  );
};

export default Reactions;
