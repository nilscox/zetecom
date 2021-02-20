import { Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator';

class ReactionsDto {
  @IsOptional()
  @IsString({ each: true })
  like?: string[];

  @IsOptional()
  @IsString({ each: true })
  approve?: string[];

  @IsOptional()
  @IsString({ each: true })
  think?: string[];

  @IsOptional()
  @IsString({ each: true })
  disagree?: string[];

  @IsOptional()
  @IsString({ each: true })
  dontUnderstand?: string[];
}

class EditionDto {
  @IsString()
  text: string;

  @IsDateString()
  date: string;
}

export class CommentDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsDateString()
  created?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReactionsDto)
  reactions?: ReactionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditionDto)
  history?: EditionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  replies?: CommentDto[];
}
