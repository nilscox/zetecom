import { Expose, Type } from 'class-transformer';

import { InformationOutDto } from '../../information/dtos/information-out.dto';
// import { ReactionWithInformationOutDto } from '../../reaction/dtos/reaction-out.dto';

export class SubscriptionOutDto {

  @Expose()
  id: number;

  @Expose()
  created: Date;

  @Expose()
  @Type(() => InformationOutDto)
  information: InformationOutDto;

  // @Expose()
  // @Type(() => ReactionWithInformationOutDto)
  // reaction: ReactionWithInformationOutDto;

  constructor(value: any) {
    Object.assign(this, value);

    if (!value)
      return;

    if (value.information)
      this.information = Object.assign(new InformationOutDto(), value.information);

    // if (value.reaction)
    //   this.reaction = Object.assign(new ReactionWithInformationOutDto(), value.reaction);
  }

}
