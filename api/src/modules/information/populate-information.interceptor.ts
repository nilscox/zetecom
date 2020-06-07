import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { PopulateReaction } from '../reaction/populate-reaction.interceptor';
import { Reaction } from '../reaction/reaction.entity';

import { Information } from './information.entity';
import { InformationRepository } from './information.repository';

@Injectable()
export class PopulateInformation extends TransformInterceptor<Information> {

  get informationRepository() {
    return getCustomRepository(InformationRepository);
  }

  async transform(information: Information[], request: any) {
    const reactions: Reaction[] = [].concat(...information.map(info => info.reactions || []));

    if (reactions.length > 0)
      await new PopulateReaction().transform(reactions, request);

    await this.addReactionsCounts(information);
  }

  async addReactionsCounts(informations: Information[]): Promise<void> {
    const counts = await this.informationRepository.getReactionsCounts(informations.map(i => i.id));

    informations.forEach(i => i.reactionsCount = counts[i.id]);
  }

}
