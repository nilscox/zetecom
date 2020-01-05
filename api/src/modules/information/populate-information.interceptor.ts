import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { InformationService } from './information.service';
import { Information } from './information.entity';

@Injectable()
export class PopulateInformation extends TransformInterceptor<Information> {

  constructor(
    private readonly informationService: InformationService,
  ) {
    super();
  }

  async transform(information: Information[]) {
    await this.informationService.addReactionsCounts(information);
    await this.informationService.addSubjectsCounts(information);
  }
}
