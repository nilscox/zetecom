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
  signupDate: string;
  roles: Role[];
};
