import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { InformationService } from '../information/information.service';
import { UserService } from '../user/user.service';

import { CommentsQueryArgs } from './args/comments-query.args';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentType } from './types/comment.type';

@Resolver(of => CommentType)
export class CommentResolver {

  constructor(
    private readonly informationService: InformationService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Query(returns => [CommentType])
  async comments(@Args() { informationId, authorId, search, offset, limit }: CommentsQueryArgs) {
    if (undefined !== informationId && !await this.informationService.findById(informationId))
      throw new Error('information not found');

    if (undefined !== authorId && !await this.userService.findById(authorId))
      throw new Error('user not found');

    return this.commentService.findAll(informationId, authorId, search, offset, limit);
  }

  @ResolveField()
  async message(@Parent() comment: Comment) {
    return comment.messages[0].text;
  }

}
