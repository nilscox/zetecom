import { createParamDecorator } from '@nestjs/common';

export const PageQuery = createParamDecorator((_data: any, req): number => {
  const page = parseInt(req.query.page, 10);

  return !page || page <= 0 ? 1 : page;
});
