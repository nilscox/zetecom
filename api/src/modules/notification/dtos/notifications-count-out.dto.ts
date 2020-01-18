import { Expose } from 'class-transformer';

export class NotificationsCountOutDto {

  @Expose()
  count: number;

}
