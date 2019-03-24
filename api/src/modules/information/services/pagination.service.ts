import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {

  static DEFAULT_PAGE_SIZE: number = 10;

  paginationOptions(page: number, pageSize: number = PaginationService.DEFAULT_PAGE_SIZE) {
    if (page <= 0)
      page = 1;

    return {
      skip: pageSize * (page - 1),
      take: pageSize,
    };
  }

}
