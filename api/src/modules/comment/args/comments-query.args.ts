import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

import PaginationArgs from '../../graphql/pagination.args';

@ArgsType()
export class CommentsQueryArgs extends PaginationArgs {

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  informationId?: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  authorId?: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

}
