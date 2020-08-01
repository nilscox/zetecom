import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export default class PaginationArgs {

  @Field(type => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  limit: number;

}
