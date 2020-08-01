import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { AuthUser } from 'Common/auth-user.decorator';

import { UserFullType } from 'src/modules/user/types/user-full.type';

import { IsAuthenticated } from '../../common/auth.guard';
import PaginationArgs from '../graphql/pagination.args';

import { UserType } from './types/user.type';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => UserFullType)
export class UserResolver {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(returns => [UserType])
  users(@Args() { limit, offset }: PaginationArgs) {
    return this.userService.findAll(limit, offset);
  }

  @Query(returns => UserType)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Query(returns => UserFullType)
  @UseGuards(IsAuthenticated)
  me(@AuthUser() user: User) {
    return user;
  }

}
