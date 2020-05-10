import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { SortType } from './sort-type';

const isSortType = (value: string): value is SortType => {
  return [SortType.DATE_ASC, SortType.DATE_DESC, SortType.RELEVANCE].includes(value as SortType);
};

@Injectable()
export class SortTypePipe implements PipeTransform<string, SortType> {

  transform(value: string | undefined): SortType {
    if (value && isSortType(value))
      return value;

    throw new BadRequestException('invalid sort type');
  }

}
