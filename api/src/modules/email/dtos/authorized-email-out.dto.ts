import { Expose, Type } from 'class-transformer';

export class AuthorizedEmailOutDto {

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Type(() => Date)
  created: Date;

}
