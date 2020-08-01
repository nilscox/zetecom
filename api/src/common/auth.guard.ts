import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

class AuthenticationGuard {

  protected getRequest(context: ExecutionContext) {
    switch (context.getType<GqlContextType>()) {
    case 'graphql':
      return GqlExecutionContext.create(context).getContext().req;

    case 'http':
      return context.switchToHttp().getRequest();
    }
  }

}

@Injectable()
export class IsAuthenticated extends AuthenticationGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.getRequest(context).user !== undefined;
  }

}

@Injectable()
export class IsNotAuthenticated extends AuthenticationGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.getRequest(context).user === undefined;
  }

}
