import { IsEnum, IsOptional } from 'class-validator';

import { ShortReplyType } from '../short-reply.entity';

export class ShortReplyInDto {

  @IsOptional()
  @IsEnum(ShortReplyType)
  type: ShortReplyType | null;

}
