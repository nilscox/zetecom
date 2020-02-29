import { CanActivate, ExecutionContext } from '@nestjs/common';

export class IsAuthenticated implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.user !== undefined;
  }

}

export class IsNotAuthenticated implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.user === undefined;
  }

}
