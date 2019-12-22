import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { BookmarkRepository } from './bookmark.repository';
import { ReactionModule } from '../reaction/reaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookmarkRepository]),
    forwardRef(() => ReactionModule),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: [TypeOrmModule],
})
export class BookmarkModule {}
