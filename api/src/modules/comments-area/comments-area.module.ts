import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/modules/user/user.module';

import { CommentsAreaController } from './comments-area.controller';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaService } from './comments-area.service';
import { CommentsAreaIntegrationModule } from './comments-area-integration/comments-area-integration.module';
import { CommentsAreaRequestModule } from './comments-area-request/comments-area-request.module';
import { PopulateCommentsArea } from './populate-comments-area.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsAreaRepository]),
    CqrsModule,
    UserModule,
    CommentsAreaRequestModule,
    CommentsAreaIntegrationModule,
  ],
  controllers: [CommentsAreaController],
  providers: [CommentsAreaService, PopulateCommentsArea],
  exports: [TypeOrmModule, CommentsAreaService, PopulateCommentsArea],
})
export class CommentsAreaModule {}
