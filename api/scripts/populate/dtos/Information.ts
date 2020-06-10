import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { ReactionDto } from './Reaction';

export class InformationDto {

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
  @Type(() => ReactionDto)
  reactions?: ReactionDto[];

}
