import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaService } from './comments-area.service';

type CommentsAreaFactoryData = {
  creator?: User;
  informationIitle?: string;
  informationUrl?: string;
  imageUrl?: string;
};

@Injectable()
export class CommentsAreaFactory implements Factory<CommentsAreaFactoryData, CommentsArea> {
  constructor(
    private readonly commentsAreaService: CommentsAreaService,
    private readonly userFactory: UserFactory,
  ) {}

  async create(data: CommentsAreaFactoryData = {}) {
    const getCreator = async () => {
      return data.creator || await this.userFactory.create();
    };

    return this.commentsAreaService.create(
      {
        identifier: `id:${Math.random().toString(36).slice(6)}`,
        informationUrl: data.informationUrl || 'https://information.url',
        informationTitle: data.informationIitle || 'Fake News!',
        informationAuthor: 'anyone',
        imageUrl: data.imageUrl,
      },
      await getCreator(),
    );
  }
}
