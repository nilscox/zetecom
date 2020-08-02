import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class ReactionsDto {
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

export class CommentDto {

  @IsString()
  author: string;

  @IsString()
  text: string;

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
