import { ClassSerializerInterceptor, mixin, PlainLiteralObject, Type, UseInterceptors } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

export function OutputClassSerializer<T>(serializedClass: Type<T>): Type<ClassSerializerInterceptor> {
  class CustomSerializer extends ClassSerializerInterceptor {
    transformToPlain(initialValue: any, transformOptions: ClassTransformOptions = {}): PlainLiteralObject {
      if (!transformOptions.strategy) {
        transformOptions.strategy = 'excludeAll';
      }

      return super.transformToPlain(Object.assign(new serializedClass(), initialValue), transformOptions);
    }
  }

  return mixin(CustomSerializer);
}

export function Output<T>(dto: Type<T>) {
  return UseInterceptors(OutputClassSerializer(dto));
}
