import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RulesUpdateInDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+\.\d+$/)
  version: string;
}
