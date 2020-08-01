import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentType {

  @Field(type => Int)
  id: number;

  @Field()
  message: string;

}
