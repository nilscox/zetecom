import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { BookmarkRepository } from './bookmark.repository';

const BOOKMARK_PAGE_SIZE = 'BOOKMARK_PAGE_SIZE';
const BookmarkPageSize: Provider = {
  provide: BOOKMARK_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkRepository])],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkPageSize],
})
export class BookmarkModule {}
