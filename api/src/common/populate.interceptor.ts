import { Request } from 'express';

import { TransformInterceptor } from 'src/common/transform.interceptor';

import { Paginated } from './paginated';

export abstract class PopulateInterceptor<T> extends TransformInterceptor<T | T[] | Paginated<T>, T | T[] | Paginated<T>> {

  async transform(data: T | T[] | Paginated<T>, request: Request) {
    const items = 'items' in data ? data.items : Array.isArray(data) ? data : [data];

    if (items.length > 0)
      await this.populate(items, request);

    if ('items' in data)
      return { total: data.total, items };

    if (Array.isArray(data))
      return items;

    return items[0];
  }

  abstract populate(data: T[], request: Request): void | Promise<void>;

}
