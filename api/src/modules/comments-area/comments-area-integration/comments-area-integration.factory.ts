import { getRepository } from 'typeorm';

import { CommentsAreaFactory } from 'src/modules/comments-area/comments-area.factory';
import { Factory } from 'src/testing/factory';

import { CommentsAreaIntegration } from './comments-area-integration.entity';

export class CommentsAreaIntegrationFactory implements Factory<CommentsAreaIntegration> {
  private commentsAreaFactory = new CommentsAreaFactory();

  private get repository() {
    return getRepository(CommentsAreaIntegration);
  }

  async create(override: Partial<Omit<CommentsAreaIntegration, 'id'>> = {}) {
    const data = {
      identifier: `id:${Math.random().toString(36).slice(6)}`,
      ...override,
    };

    if (!data.commentsArea) {
      data.commentsArea = await this.commentsAreaFactory.create();
    }

    return this.repository.save(data);
  }
}
