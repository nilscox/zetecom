import { IsOptional, IsString } from 'class-validator';

export class CommentsAreaRequestRejectedInDto {
  @IsString()
  @IsOptional()
  reason?: string;
}
