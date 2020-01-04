import { Expose, Type } from 'class-transformer';

import { InformationOutDto } from 'src/modules/information/dtos/information-out.dto';
import { ReactionOutDto } from 'src/modules/reaction/dtos/reaction-out.dto';

export class InformationBookmarksOutDto {

  @Expose()
  @Type(() => InformationOutDto)
  information: InformationOutDto;

  @Expose()
  @Type(() => ReactionOutDto)
  reactions: ReactionOutDto[];

  constructor(values: any) {
    Object.assign(this, values);

    this.information = Object.assign(new InformationOutDto(), values.information);
    this.reactions = Object.assign(new ReactionOutDto(), values.reactions);
  }

}
