export const reactions = ['like', 'approve', 'think', 'disagree', 'dontUnderstand'] as const;
export type Reaction = typeof reactions[number];

export const reactionTitle: Record<Reaction, string> = {
  like: "J'aime",
  approve: "Je suis d'accord",
  think: 'Ça me fait réfléchir',
  disagree: "Je ne suis pas d'accord",
  dontUnderstand: 'Je ne comprends pas',
};

export const reactionEmoji: Record<Reaction, string> = {
  like: '❤️',
  approve: '👍',
  think: '🧠',
  disagree: '🤨',
  dontUnderstand: '❓',
};
