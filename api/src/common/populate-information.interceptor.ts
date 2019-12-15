import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from './transform.interceptor';
import { InformationService } from '../modules/information/information.service';
import { Information } from 'src/modules/information/information.entity';

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
