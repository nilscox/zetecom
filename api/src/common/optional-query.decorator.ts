import { createParamDecorator } from '@nestjs/common';

interface OptionalQueryParams {
  key: string;
  defaultValue: string;
}

export const OptionalQuery = createParamDecorator((data: OptionalQueryParams, req): string => {
  return req.query[data.key] || data.defaultValue;
});
