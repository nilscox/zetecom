export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export type UserLight = {
  id: number;
  nick: string;
  avatar: string | null;
};

export type User = UserLight & {
  email: string;
  requiresEmailValidation?: boolean;
  sinupDate: Date;
  roles: Role[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUser = (data: any): User => {
  return {
    ...data,
    signupDate: data.signupDate ? new Date(data.signupDate) : null,
  };
};
