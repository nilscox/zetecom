import { Expose } from 'class-transformer';

export class NotificationsCountDto {
  constructor(partial: Partial<NotificationsCountDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  count: number;
}
