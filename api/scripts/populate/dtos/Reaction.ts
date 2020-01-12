import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class QuickReactions {
  @IsString({ each: true })
  @IsOptional()
  approve?: string[];

  @IsString({ each: true })
  @IsOptional()
  refute?: string[];

  @IsString({ each: true })
  @IsOptional()
  skeptic?: string[];
}

export class Reaction {

  @IsString()
  author: string;

  @IsString()
  text: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuickReactions)
  quickReactions?: QuickReactions;

  @IsString({ each: true })
  @IsOptional()
  history?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Reaction)
  replies?: Reaction[];

}
