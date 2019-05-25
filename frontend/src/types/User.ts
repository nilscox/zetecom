export type User = {
  id: number;
  nick: string;
  email: string;
  avatar: string | null;
  created: Date;
  updated: Date;

  getAvatarUrl: () => string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUser = (data: any): User => {
  const user = {
    ...data,
    created: data.created ? new Date(data.created) : null,
    updated: data.updated ? new Date(data.updated) : null,
  };

  user.getAvatarUrl = () => {
    if (user.avatar)
      return `/assets/images/avatars/${user.avatar}`;

    return '/assets/images/default-avatar.png';
  };

  return user;
};
