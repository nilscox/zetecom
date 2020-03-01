import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';

import { TransformInterceptor } from '../../common/transform.interceptor';

import { Information } from './information.entity';
import { InformationRepository } from './information.repository';

@Injectable()
export class PopulateInformation extends TransformInterceptor<Information> {

  get informationRepository() {
    return getCustomRepository(InformationRepository);
  }

  async transform(information: Information[]) {
    await this.addReactionsCounts(information);
  }

  async addReactionsCounts(informations: Information[]): Promise<void> {
    const counts = await this.informationRepository.getReactionsCounts(informations.map(i => i.id));

    informations.forEach(i => i.reactionsCount = counts[i.id]);
  }

}
