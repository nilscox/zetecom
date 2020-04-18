import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from 'src/modules/authorization/roles.enum';
import { User } from 'src/modules/user/user.entity';

import { AuthorizationService } from '../modules/authorization/authorization.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    // TODO: better roles handling in tests
    if (process.env.NODE_ENV === 'cypress')
      return true;

    if (!roles)
      return true;

    if (roles.length > 1)
      throw new Error('Multiple roles authorization is not supported');

    const request = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    return user && this.authorizationService.isAuthorized(user, roles[0]);
  }

}
