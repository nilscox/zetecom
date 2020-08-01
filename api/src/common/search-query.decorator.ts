import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SearchQuery = createParamDecorator((_data: unknown, ctx: ExecutionContext): number => {
  switch (ctx.getType()) {
  case 'http':
    return ctx.switchToHttp().getRequest().query.search;

  default:
    throw new Error('PageQuery can only be used in http context');
  }
});
