import { Injectable, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

import { TransformInterceptor } from 'Common/transform.interceptor';

import { Paginated } from './paginated';

export function CastToDto<Entity, Dto>(dto: ClassType<Dto>) {
  @Injectable()
  class CastToDtoInterceptor extends TransformInterceptor<Entity | Entity[] | Paginated<Entity>, Dto | Dto[] | Paginated<Dto>> {

    async transform(data: Entity | Entity[] | Paginated<Entity>) {
      const items = 'items' in data ? data.items : Array.isArray(data) ? data : [data];

      const dtos = items.map(item => plainToClass(dto, item));

      if ('items' in data)
        return { total: data.total, items: dtos };

      if (Array.isArray(data))
        return dtos;

      return dtos[0];
    }

  }

  return UseInterceptors(CastToDtoInterceptor);
}
