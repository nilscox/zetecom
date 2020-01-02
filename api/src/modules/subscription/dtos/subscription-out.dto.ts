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

  constructor(value: any) {
    Object.assign(this, value);

    if (!value)
      return;

    if (value.information)
      this.information = Object.assign(new InformationOutDto(), value.information);

    if (value.subject)
      this.subject = Object.assign(new SubjectOutDto(), value.subject);

    if (value.reaction)
      this.reaction = Object.assign(new ReactionOutDto(), value.reaction);
  }

}
