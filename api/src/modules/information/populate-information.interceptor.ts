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

  async populate(informations: InformationDto[], request: any) {
    const dtos = informations.map(information => new InformationDto(information));

    await this.addCommentsCounts(dtos);
  }

  async addCommentsCounts(informations: InformationDto[]) {
    const counts = await this.informationService.getCommentsCounts(informations.map(i => i.id));

    informations.forEach(i => i.commentsCount = counts[i.id]);
  }

}
