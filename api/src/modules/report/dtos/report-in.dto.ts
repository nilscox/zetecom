import { IsOptional, MaxLength } from 'class-validator';

export class ReportInDto {

  @IsOptional()
  @MaxLength(4000)
  message: string;

}
