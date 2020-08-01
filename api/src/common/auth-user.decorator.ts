import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  switch (ctx.getType<GqlContextType>()) {
  case 'graphql':
    return GqlExecutionContext.create(ctx).getContext().req.user;

  case 'http':
    return ctx.switchToHttp().getRequest().user;
  }
});
