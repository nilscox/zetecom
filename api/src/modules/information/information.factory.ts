import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { Information } from './information.entity';
import { InformationService } from './information.service';

type InformationFactoryData = {
  creator?: User;
  title?: string;
  url?: string;
};

@Injectable()
export class InformationFactory implements Factory<InformationFactoryData, Information> {
  constructor(
    private readonly informationService: InformationService,
    private readonly userFactory: UserFactory,
  ) {}

  async create(data: InformationFactoryData = {}) {
    const getCreator = async () => {
      return data.creator || await this.userFactory.create();
    };

    return this.informationService.create(
      {
        identifier: `id:${Math.random().toString(36).slice(6)}`,
        title: data.title || 'Fake News!',
        url: data.url || 'https://information.url',
      },
      await getCreator(),
    );
  }
}
