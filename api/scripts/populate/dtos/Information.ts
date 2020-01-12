import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Reaction } from './Reaction';
import { Subject } from './Subject';

export class Information {

  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  creator: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Reaction)
  reactions?: Reaction[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Subject)
  subjects?: Subject[];

}
