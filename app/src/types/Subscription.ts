import { parseReaction, Reaction } from './Reaction';

export type Subscription = {
  id: number;
  created: Date;
  reaction: Reaction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSubscription = (data: any): Subscription => {
  return {
    ...data,
    date: new Date(data.date),
    reaction: parseReaction(data.reaction),
  };
};
