import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { InformationService } from '../information/information.service';
import { UserService } from '../user/user.service';

import { GetCommentsArgs } from './args/GetCommentsArgs';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentType } from './types/CommentType';

@Resolver(of => CommentType)
export class CommentResolver {

  constructor(
    private readonly informationService: InformationService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Query(returns => [CommentType])
  async comments(@Args() { informationId, authorId, offset, limit }: GetCommentsArgs) {
    if (!await this.informationService.findById(informationId))
      throw new Error('information not found');

    if (!await this.userService.findById(authorId))
      throw new Error('user not found');

    return this.commentService.findAll(informationId, authorId, '', offset, limit);
  }

  @ResolveField()
  async message(@Parent() comment: Comment) {
    return comment.message.text;
  }

}
