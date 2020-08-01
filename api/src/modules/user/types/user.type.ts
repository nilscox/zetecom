import { ObjectType, PickType } from '@nestjs/graphql';

import { UserFullType } from 'src/modules/user/types/user-full.type';

@ObjectType()
export class UserType extends PickType(UserFullType, ['id', 'nick', 'avatar']) {}
