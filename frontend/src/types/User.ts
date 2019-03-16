type UserAvatar = {
  // TODO
};

export type User = {
  id: number;
  nick: string;
  email: string;
  avatar: UserAvatar | null;
  created: Date;
  updated: Date;
};
