import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {

  static DEFAULT_PAGE_SIZE: number = 5;

  paginationOptions(page: number, pageSize: number = PaginationService.DEFAULT_PAGE_SIZE) {
    return {
      skip: pageSize * (page - 1),
      take: pageSize,
    };
  }

}
