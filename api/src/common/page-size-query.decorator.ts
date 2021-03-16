import { createParamDecorator, ExecutionContext, ImATeapotException } from '@nestjs/common';

const defaultPageSize = 10;

export const PageSizeQuery = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const pageSize = parseInt(request.query?.pageSize, 10);

  if (pageSize > 50) {
    throw new ImATeapotException();
  }

  return !pageSize || pageSize <= 0 ? defaultPageSize : pageSize;
});
