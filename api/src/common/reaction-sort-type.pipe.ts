import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

import { ReactionSortType } from '../utils/reaction-sort-type';

@Injectable()
export class ReactionSortTypePipe implements PipeTransform<string, ReactionSortType> {

  transform(value: string | undefined, metadata: ArgumentMetadata): ReactionSortType {
    if (!value)
      return ReactionSortType.DATE_DESC;

    for (const key in ReactionSortType) {
      if (value === ReactionSortType[key])
        return value as ReactionSortType;
    }

    throw new BadRequestException('invalid sort type');
  }

}
