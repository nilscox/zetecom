import { Injectable } from '@nestjs/common';

import { PopulateInterceptor } from 'src/common/populate.interceptor';

import { CommentsAreaService } from './comments-area.service';
import { CommentsAreaDto } from './dtos/comments-area.dto';

@Injectable()
export class PopulateCommentsArea extends PopulateInterceptor<CommentsAreaDto> {

  constructor(
    private readonly commentsAreaService: CommentsAreaService,
  ) {
    super();
  }

  async populate(dtos: CommentsAreaDto[]) {
    await this.addCommentsCounts(dtos);
  }

  private async addCommentsCounts(commentsAreas: CommentsAreaDto[]) {
    const counts = await this.commentsAreaService.getCommentsCounts(commentsAreas.map(i => i.id));

    for (const commentsArea of commentsAreas)
      commentsArea.commentsCount = counts[commentsArea.id];
  }

}
