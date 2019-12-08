import { IsDefined, IsEnum, MaxLength, ValidateIf } from 'class-validator';

import { ReportType } from '../report.entity';

export class ReportInDto {

  @IsEnum(ReportType)
  type: ReportType;

  @ValidateIf(o => o.type === ReportType.OTHER)
  @IsDefined()
  @MaxLength(4000)
  message: string;

}
