import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PageQuery = createParamDecorator((_data: unknown, ctx: ExecutionContext): number => {
  switch (ctx.getType()) {
  case 'http': {
    const page = parseInt(ctx.switchToHttp().getRequest().query.page, 10);

    return !page || page <= 0 ? 1 : page;
  }

  default:
    throw new Error('PageQuery can only be used in http context');
  }
});
