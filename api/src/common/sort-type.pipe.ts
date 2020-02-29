import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { SortType } from './sort-type';

@Injectable()
export class SortTypePipe implements PipeTransform<string, SortType> {

  transform(value: string | undefined, metadata: ArgumentMetadata): SortType {
    for (const key in SortType) {
      if (value === SortType[key])
        return value as SortType;
    }

    throw new BadRequestException('invalid sort type');
  }

}
