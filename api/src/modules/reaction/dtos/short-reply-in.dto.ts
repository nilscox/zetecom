import { IsEnum } from 'class-validator';

import { ShortReplyType } from '../short-reply.entity';

export class ShortReplyInDto {

  @IsEnum(ShortReplyType)
  type: ShortReplyType;

}
