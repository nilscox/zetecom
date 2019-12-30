import { Expose, Type } from 'class-transformer';

import { InformationOutDto } from '../../information/dtos/information-out.dto';
import { ReactionOutDto } from '../../reaction/dtos/reaction-out.dto';
import { SubjectOutDto } from '../../subject/dtos/subject-out.dto';

export class SubscriptionOutDto {

  @Expose()
  id: number;

  @Expose()
  created: Date;

  @Expose()
  @Type(() => InformationOutDto)
  information: InformationOutDto;

  @Expose()
  @Type(() => SubjectOutDto)
  subject: SubjectOutDto;

  @Expose()
  @Type(() => ReactionOutDto)
  reaction: ReactionOutDto;

}
