import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { Comment } from '../comment/comment.entity';
import { PopulateComment } from '../comment/populate-comment.interceptor';

import { Information } from './information.entity';
import { InformationRepository } from './information.repository';

@Injectable()
export class PopulateInformation extends TransformInterceptor<Information> {

  get informationRepository() {
    return getCustomRepository(InformationRepository);
  }

  async transform(information: Information[], request: any) {
    const comments: Comment[] = [].concat(...information.map(info => info.comments || []));

    if (comments.length > 0)
      await new PopulateComment().transform(comments, request);

    await this.addCommentsCounts(information);
  }

  async addCommentsCounts(informations: Information[]): Promise<void> {
    const counts = await this.informationRepository.getCommentsCounts(informations.map(i => i.id));

    informations.forEach(i => i.commentsCount = counts[i.id]);
  }

}
