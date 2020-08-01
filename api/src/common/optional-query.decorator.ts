import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface OptionalQueryParams {
  key: string;
  defaultValue?: string;
}

export const OptionalQuery = createParamDecorator((data: OptionalQueryParams, ctx: ExecutionContext): string => {
  switch (ctx.getType()) {
  case 'http':
    return ctx.switchToHttp().getRequest().query[data.key] || data.defaultValue;

  default:
    throw new Error('OptionalQuery can only be used in http context');
  }
});
