import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from 'src/modules/notification/notification.module';
import { UserModule } from 'src/modules/user/user.module';

import { CommentsAreaCreatedHandler } from './comments-area-created-handler';
import { CommentsAreaRequestController } from './comments-area-request.controller';
import { CommentsAreaRequest } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsAreaRequest]), CqrsModule, UserModule, NotificationModule],
  controllers: [CommentsAreaRequestController],
  providers: [CommentsAreaRequestService, CommentsAreaCreatedHandler],
  exports: [CommentsAreaRequestService],
})
export class CommentsAreaRequestModule {}
