export type UserLight = {
  id: number;
  nick: string;
  avatar: string | null;
};

export type User = UserLight & {
  email: string;
  created: Date;
  updated: Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUser = (data: any): User => {
  return {
    ...data,
    created: data.created ? new Date(data.created) : null,
    updated: data.updated ? new Date(data.updated) : null,
  };
};
