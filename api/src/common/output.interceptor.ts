import {
  ClassSerializerInterceptor,
  mixin,
  PlainLiteralObject,
  Type,
  UseInterceptors,
} from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { plainToClass } from 'class-transformer';

import { Paginated } from './paginated';

const plainToClassOptions: ClassTransformOptions = {
  enableCircularCheck: true,
};

function OutputClassSerializer<T>(Dto: Type<T>): Type<ClassSerializerInterceptor> {
  return mixin(class extends ClassSerializerInterceptor {
    transformToPlain(value: any): PlainLiteralObject {
      return super.transformToPlain(plainToClass(Dto, value, plainToClassOptions), { strategy: 'excludeAll' });
    }
  });
}

export function Output<T>(Dto: Type<T>) {
  return UseInterceptors(OutputClassSerializer(Dto));
}

function PaginatedOutputClassSerializer<T>(Dto: Type<T>): Type<ClassSerializerInterceptor> {
  return mixin(class extends ClassSerializerInterceptor {
    transformToPlain(value: Paginated<any>): PlainLiteralObject {
      return {
        items: value.items.map(i => super.transformToPlain(plainToClass(Dto, i, plainToClassOptions), { strategy: 'excludeAll' })),
        total: value.total,
      };
    }
  });
}

export function PaginatedOutput<T>(Dto: Type<T>) {
  return UseInterceptors(PaginatedOutputClassSerializer(Dto));
}
