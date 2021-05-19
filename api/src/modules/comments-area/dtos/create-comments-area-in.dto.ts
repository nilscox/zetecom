import { IsOptional, IsString } from 'class-validator';

export class CreateCommentsAreaInDto {
  @IsString()
  @IsOptional()
  readonly integrationIdentifier?: string;
}
