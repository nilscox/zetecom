import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { Comment } from '../comment/comment.entity';
import { PopulateComment } from '../comment/populate-comment.interceptor';
import { Information } from '../information/information.entity';
import { PopulateInformation } from '../information/populate-information.interceptor';

import { CommentSubscription } from './subscription.entity';

@Injectable()
export class PopulateSubscription extends TransformInterceptor<CommentSubscription> {

  async transform(subscriptions: CommentSubscription[], request: any) {
    const comments: Comment[] = [];
    const informations: Information[] = [];

    subscriptions.forEach(subscription => {
      if (subscription.comment) {
        comments.push(subscription.comment);

        comments.forEach(comment => informations.push(comment.information));
      }
    });

    await new PopulateComment().transform(comments, request);
    await new PopulateInformation().transform([...new Set(informations)], request);
  }

}
