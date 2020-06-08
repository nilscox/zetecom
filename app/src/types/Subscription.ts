import { parseReaction, Reaction } from './Reaction';

export type ReactionSubscription = {
  id: number;
  created: Date;
  reaction: Reaction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReactionSubscription = (data: any): ReactionSubscription => {
  return {
    ...data,
    date: new Date(data.date),
    reaction: parseReaction(data.reaction),
  };
};
