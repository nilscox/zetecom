import { IsOptional, IsString } from 'class-validator';

export class CommentsAreaRequestInDto {
  @IsOptional()
  @IsString()
  readonly identifier?: string;
}
