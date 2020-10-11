import { Type } from 'class-transformer';

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export class UserLight {
  id: number;

  nick: string;

  avatar: string | null;
}

export class User extends UserLight {
  email: string;

  requiresEmailValidation?: boolean;

  @Type(() => Date)
  signupDate: Date;

  roles: Role[];
}
