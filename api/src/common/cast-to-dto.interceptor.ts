import { mixin, UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import { TransformInterceptor } from 'src/common/transform.interceptor';

import { Paginated } from './paginated';

export function CastToDto<Entity, Dto>(DtoClass: ClassConstructor<Dto>) {
  class CastToDtoInterceptor extends TransformInterceptor<
    Entity | Entity[] | Paginated<Entity>,
    Dto | Dto[] | Paginated<Dto>
  > {
    async transform(data: Entity | Entity[] | Paginated<Entity>) {
      const items = 'items' in data ? data.items : Array.isArray(data) ? data : [data];

      const dtos = items.map((item) => new DtoClass(item));

      if ('items' in data) return { total: data.total, items: dtos };

      if (Array.isArray(data)) return dtos;

      return dtos[0];
    }
  }

  return UseInterceptors(mixin(CastToDtoInterceptor));
}
