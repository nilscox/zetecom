import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface OptionalQueryParams {
  key: string;
  defaultValue?: string;
}

export const OptionalQuery = createParamDecorator((data: OptionalQueryParams, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.query?.[data.key] || data.defaultValue;
});
