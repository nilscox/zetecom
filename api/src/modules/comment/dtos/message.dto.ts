import { Expose } from 'class-transformer';

export class MessageDto {

  constructor(partial: Partial<MessageDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  text: string;

  @Expose({ name: 'date' })
  created: Date;

}
