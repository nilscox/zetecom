import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReactionModule } from '../reaction/reaction.module';

import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { BookmarkService } from './bookmark.service';

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
