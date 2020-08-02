import { IsOptional, MaxLength } from 'class-validator';

export class CreateReportDto {

  @IsOptional()
  @MaxLength(4000)
  message: string;

}
