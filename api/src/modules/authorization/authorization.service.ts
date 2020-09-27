import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';

import { Role } from './roles.enum';

@Injectable()
export class AuthorizationService {

  isAuthorized(user: User, roles: Role[]): boolean {
    return roles.some(role => user.roles.includes(role));
  }

}
