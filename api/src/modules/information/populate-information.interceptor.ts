import { Injectable } from '@nestjs/common';

import { PopulateInterceptor } from '../../common/populate.interceptor';

import { InformationDto } from './dtos/information.dto';
import { InformationService } from './information.service';

@Injectable()
export class PopulateInformation extends PopulateInterceptor<InformationDto> {

  constructor(
    private readonly informationService: InformationService,
  ) {
    super();
  }

  async populate(dtos: InformationDto[]) {
    await this.addCommentsCounts(dtos);
  }

  private async addCommentsCounts(informations: InformationDto[]) {
    const counts = await this.informationService.getCommentsCounts(informations.map(i => i.id));

    for (const information of informations)
      information.commentsCount = counts[information.id];
  }

}
