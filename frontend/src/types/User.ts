export type User = {
  id: number;
  nick: string;
  email: string;
  avatar: string | null;
  created: Date;
  updated: Date;
};

export const parseUser = (data: any): User => {
  return {
    ...data,
    created: data.created ? new Date(data.created) : null,
    updated: data.updated ? new Date(data.updated) : null,
  };
};
