import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class ReactionsDto {
  @IsOptional()
  @IsString({ each: true })
  approve?: string[];

  @IsOptional()
  @IsString({ each: true })
  refute?: string[];

  @IsOptional()
  @IsString({ each: true })
  skeptic?: string[];
}

export class CommentDto {

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReactionsDto)
  reactions?: ReactionsDto;

  @IsString({ each: true })
  @IsOptional()
  history?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  replies?: CommentDto[];

}
