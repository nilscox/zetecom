import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

import { ReactionDto } from './Reaction';

export class InformationDto {

  @IsString()
  title: string;

  @IsString()
  identifier: string;

  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  creator: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReactionDto)
  comments?: ReactionDto[];

}
