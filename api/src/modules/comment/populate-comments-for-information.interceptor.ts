import { Injectable } from '@nestjs/common';

import { PopulateInterceptor } from '../../common/populate.interceptor';
import { PopulateInformation } from '../information/populate-information.interceptor';

import { CommentsForInformationDto } from './dtos/comments-for-information.dto';
import { PopulateComment } from './populate-comment.interceptor';

@Injectable()
export class PopulateCommentsForInformation extends PopulateInterceptor<CommentsForInformationDto> {
  constructor(
    private readonly populateInformation: PopulateInformation,
    private readonly populateComment: PopulateComment,
  ) {
    super();
  }

  async populate(commentsForInformation: CommentsForInformationDto[], request: any) {
    const informations = commentsForInformation.map(({ information }) => information);
    // eslint-disable-next-line prefer-spread
    const comments = [].concat.apply([], commentsForInformation.map(({ comments }) => comments));

    const uniqueInformationsIds = [...new Set(informations.map(({ id }) => id))];
    const uniqueInformations = uniqueInformationsIds.map(informationId => informations.find(({ id }) => id === informationId));

    await this.populateInformation.populate(uniqueInformations);
    await this.populateComment.populate(comments, request);
  }
}
