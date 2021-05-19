import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsAreaModule } from 'src/modules/comments-area/comments-area.module';
import { UserModule } from 'src/modules/user/user.module';

import { CommentsAreaRequestController } from './comments-area-request.controller';
import { CommentsAreaRequest } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsAreaRequest]),
    CqrsModule,
    UserModule,
    forwardRef(() => CommentsAreaModule),
  ],
  controllers: [CommentsAreaRequestController],
  providers: [CommentsAreaRequestService],
  exports: [CommentsAreaRequestService],
})
export class CommentsAreaRequestModule {}
