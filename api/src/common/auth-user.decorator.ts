import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((_data, req) => {
  return req.user;
});
