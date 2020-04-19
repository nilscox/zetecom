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
    const NODE_ENV = this.configService.get('NODE_ENV');

    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    // TODO: better roles handling in tests
    if (NODE_ENV === 'cypress')
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
