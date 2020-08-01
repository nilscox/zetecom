import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserFullType {

  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  nick: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  created: Date;

}
