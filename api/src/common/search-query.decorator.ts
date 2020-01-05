import { createParamDecorator } from '@nestjs/common';

export const SearchQuery = createParamDecorator((_data: any, req): number => {
  return req.query.search;
});
