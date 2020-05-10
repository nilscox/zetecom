import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthorizationService } from '../modules/authorization/authorization.service';
import { Role } from '../modules/authorization/roles.enum';
import { ConfigService } from '../modules/config/config.service';
import { User } from '../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const BYPASS_AUTHORIZATIONS = this.configService.get('BYPASS_AUTHORIZATIONS');

    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    // TODO: better roles handling in tests
    if (BYPASS_AUTHORIZATIONS === 'true')
      return true;

    if (!roles)
      return true;

    if (roles.length > 1)
      throw new Error('Multiple roles authorization is not supported');

    const request = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    if (!user)
      return Promise.resolve(false);

    return this.authorizationService.isAuthorized(user, roles[0]);
  }

}
