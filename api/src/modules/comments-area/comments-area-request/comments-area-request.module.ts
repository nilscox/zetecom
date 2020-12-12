import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../user/user.module';
import { CommentsAreaModule } from '../comments-area.module';

import { CommentsAreaCreatedHandler } from './comments-area-created-handler';
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
  providers: [CommentsAreaRequestService, CommentsAreaCreatedHandler],
  exports: [CommentsAreaRequestService],
})
export class CommentsAreaRequestModule {}
