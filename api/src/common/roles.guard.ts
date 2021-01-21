import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthorizationService } from 'src/modules/authorization/authorization.service';
import { Role } from 'src/modules/authorization/roles.enum';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authorizationService: AuthorizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    if (!user) {
      return Promise.resolve(false);
    }

    return this.authorizationService.isAuthorized(user, roles);
  }
}
