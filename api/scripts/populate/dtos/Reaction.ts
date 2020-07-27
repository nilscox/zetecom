import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class QuickReactionsDto {
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

export class ReactionDto {

  @IsString()
  author: string;

  @IsString()
  text: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuickReactionsDto)
  reactions?: QuickReactionsDto;

  @IsString({ each: true })
  @IsOptional()
  history?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ReactionDto)
  replies?: ReactionDto[];

}
