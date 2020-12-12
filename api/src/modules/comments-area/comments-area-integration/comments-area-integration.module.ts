import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsAreaIntegration } from './comments-area-integration.entity';
import { CommentsAreaIntegrationService } from './comments-area-integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsAreaIntegration])],
  providers: [CommentsAreaIntegrationService],
  exports: [CommentsAreaIntegrationService],
})
export class CommentsAreaIntegrationModule {}
