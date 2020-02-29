import {
  ClassSerializerInterceptor,
  mixin,
  PlainLiteralObject,
  Type,
  UseInterceptors,
} from '@nestjs/common';

import { Paginated } from './paginated';

function instanciateDto<T>(Dto: Type<T>, value: any) {
  if (Dto.length === 1)
    return new Dto(value);

  return Object.assign(new Dto(), value);
}

function OutputClassSerializer<T>(Dto: Type<T>): Type<ClassSerializerInterceptor> {
  return mixin(class extends ClassSerializerInterceptor {
    transformToPlain(value: any): PlainLiteralObject {
      return super.transformToPlain(instanciateDto(Dto, value), { strategy: 'excludeAll' });
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
        items: value.items.map(i => super.transformToPlain(instanciateDto(Dto, i), { strategy: 'excludeAll' })),
        total: value.total,
      };
    }
  });
}

export function PaginatedOutput<T>(Dto?: Type<T>) {
  return UseInterceptors(PaginatedOutputClassSerializer(Dto));
}
