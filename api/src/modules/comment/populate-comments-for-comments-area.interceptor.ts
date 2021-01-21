import { Injectable } from '@nestjs/common';

import { PopulateInterceptor } from 'src/common/populate.interceptor';
import { ZCRequest } from 'src/common/zc-request.type';
import { PopulateCommentsArea } from 'src/modules/comments-area/populate-comments-area.interceptor';

import { CommentsForCommentsAreaDto } from './dtos/comments-for-comments-area.dto';
import { PopulateComment } from './populate-comment.interceptor';

@Injectable()
export class PopulateCommentsForCommentsArea extends PopulateInterceptor<CommentsForCommentsAreaDto> {
  constructor(
    private readonly populateCommentsArea: PopulateCommentsArea,
    private readonly populateComment: PopulateComment,
  ) {
    super();
  }

  async populate(commentsForCommentsArea: CommentsForCommentsAreaDto[], request: ZCRequest) {
    const commentsAreas = commentsForCommentsArea.map(({ commentsArea }) => commentsArea);
    // eslint-disable-next-line prefer-spread
    const comments = [].concat.apply([], commentsForCommentsArea.map(({ comments }) => comments));

    const cniqueCommentsAreasIds = [...new Set(commentsAreas.map(({ id }) => id))];
    const cniqueCommentsAreas = cniqueCommentsAreasIds.map(commentsAreaId => commentsAreas.find(({ id }) => id === commentsAreaId));

    await this.populateCommentsArea.populate(cniqueCommentsAreas);
    await this.populateComment.populate(comments, request);
  }
}
