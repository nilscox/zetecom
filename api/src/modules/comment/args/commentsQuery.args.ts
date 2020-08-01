import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

@ArgsType()
export class CommentsQueryArgs {

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
