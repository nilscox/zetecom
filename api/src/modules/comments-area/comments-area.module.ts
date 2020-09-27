import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from '../comment/comment.module';
import { UserModule } from '../user/user.module';

import { CommentsAreaRequestModule } from './comments-area-request/comments-area-request.module';
import { CommentsAreaController } from './comments-area.controller';
import { CommentsAreaFactory } from './comments-area.factory';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaService } from './comments-area.service';
import { PopulateCommentsArea } from './populate-comments-area.interceptor';

const COMMENTS_AREA_PAGE_SIZE = 'COMMENTS_AREA_PAGE_SIZE';
const CommentsAreaPageSize: Provider = {
  provide: COMMENTS_AREA_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsAreaRepository]),
    UserModule,
    forwardRef(() => CommentModule),
    forwardRef(() => CommentsAreaRequestModule),
  ],
  controllers: [
    CommentsAreaController,
  ],
  providers: [
    CommentsAreaPageSize,
    CommentsAreaService,
    PopulateCommentsArea,
    CommentsAreaFactory,
  ],
  exports: [
    TypeOrmModule,
    CommentsAreaPageSize,
    CommentsAreaService,
    PopulateCommentsArea,
    CommentsAreaFactory,
  ],
})
export class CommentsAreaModule {}
