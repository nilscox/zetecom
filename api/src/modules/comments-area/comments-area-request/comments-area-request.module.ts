import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../user/user.module';
import { CommentsAreaModule } from '../comments-area.module';

import { CommentsAreaRequestController } from './comments-area-request.controller';
import { CommentsAreaRequest } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsAreaRequest]), UserModule, forwardRef(() => CommentsAreaModule)],
  controllers: [CommentsAreaRequestController],
  providers: [CommentsAreaRequestService],
  exports: [CommentsAreaRequestService],
})
export class CommentsAreaRequestModule {}
