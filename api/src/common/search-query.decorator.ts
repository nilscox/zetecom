import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SearchQuery = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.query?.search;
});
