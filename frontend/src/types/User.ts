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

export const parseUser = (data: any): User => {
  return {
    ...data,
    created: new Date(data.created),
    updated: new Date(data.updated),
  };
};
