import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { Reaction } from './Reaction';

export class Information {

  @IsString()
  title: string;

  @IsString()
  identifier: string;

  @IsString()
  url: string;

  @IsString()
  creator: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Reaction)
  reactions?: Reaction[];

}
