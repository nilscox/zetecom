import { Injectable } from '@nestjs/common';

import { PopulateInterceptor } from 'src/common/populate.interceptor';

import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaDto } from './dtos/comments-area.dto';

@Injectable()
export class PopulateCommentsArea extends PopulateInterceptor<CommentsAreaDto> {
  constructor(private readonly commentsAreaRepository: CommentsAreaRepository) {
    super();
  }

  async populate(dtos: CommentsAreaDto[]) {
    await this.addCommentsCounts(dtos);
  }

  private async addCommentsCounts(commentsAreas: CommentsAreaDto[]) {
    const counts = await this.commentsAreaRepository.getCommentsCounts(commentsAreas.map((i) => i.id));

    for (const commentsArea of commentsAreas) {
      commentsArea.commentsCount = counts[commentsArea.id];
    }
  }
}
