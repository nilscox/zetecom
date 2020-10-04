import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PageQuery = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const page = parseInt(request.query?.page, 10);

  return !page || page <= 0 ? 1 : page;
});
