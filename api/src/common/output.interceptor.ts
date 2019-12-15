import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
  UseInterceptors,
  mixin,
} from '@nestjs/common';

import { Paginated } from './paginated';

function OutputClassSerializer<T>(Dto: Type<T>): Type<ClassSerializerInterceptor> {
  return mixin(class extends ClassSerializerInterceptor {
    transformToPlain(value: any): PlainLiteralObject {
      return super.transformToPlain(Object.assign(new Dto(), value), { strategy: 'excludeAll' });
    }
  });
}

export function Output<T>(Dto?: Type<T>) {
  return UseInterceptors(OutputClassSerializer(Dto));
}

function PaginatedOutputClassSerializer<T>(Dto: Type<T>): Type<ClassSerializerInterceptor> {
  return mixin(class extends ClassSerializerInterceptor {
    transformToPlain(value: Paginated<any>): PlainLiteralObject {
      return {
        items: value.items.map(i => super.transformToPlain(Object.assign(new Dto(), i), { strategy: 'excludeAll' })),
        total: value.total,
      };
    }
  });
}

export function PaginatedOutput<T>(Dto?: Type<T>) {
  return UseInterceptors(PaginatedOutputClassSerializer(Dto));
}
