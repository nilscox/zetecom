import { Expose } from 'class-transformer';

export class UserDto {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  nick: string;

  @Expose()
  avatar: string;

  @Expose({ name: 'signupDate' })
  created: Date;
}
