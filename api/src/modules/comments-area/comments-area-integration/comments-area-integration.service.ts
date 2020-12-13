import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentsArea } from '../comments-area.entity';

import { CommentsAreaIntegration } from './comments-area-integration.entity';

@Injectable()
export class CommentsAreaIntegrationService {
  constructor(
    @InjectRepository(CommentsAreaIntegration)
    private readonly commentsAreaIntegrationRepository: Repository<CommentsAreaIntegration>,
  ) {}

  async findByIdentifier(identifier: string): Promise<CommentsAreaIntegration | undefined> {
    return this.commentsAreaIntegrationRepository.findOne({ identifier }, { relations: ['commentsArea'] });
  }

  async create(commentsArea: CommentsArea, identifier: string) {
    return this.commentsAreaIntegrationRepository.save({
      commentsArea,
      identifier,
    });
  }
}
