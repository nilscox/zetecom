import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/modules/user/user.module';

import { CommentsAreaRequestController } from './comments-area-request.controller';
import { CommentsAreaRequest } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsAreaRequest]), UserModule],
  controllers: [CommentsAreaRequestController],
  providers: [CommentsAreaRequestService],
  exports: [CommentsAreaRequestService],
})
export class CommentsAreaRequestModule {}
