import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Reaction } from './Reaction';

export class Subject {
  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  quote?: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Reaction)
  reactions?: Reaction[];

}
