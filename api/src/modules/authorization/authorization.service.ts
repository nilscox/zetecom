import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';

import { Role } from './roles.enum';

@Injectable()
export class AuthorizationService {

  isAuthorized(user: User, role: Role): boolean {
    return user.roles.includes(role);
  }

}
