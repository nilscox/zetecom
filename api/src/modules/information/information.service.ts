import { Injectable, Inject } from '@nestjs/common';

import { User } from '../user/user.entity';
import { InformationRepository } from './information.repository';

import { Information } from './information.entity';
import { YoutubeService } from './youtube.service';
import { CreateInformationInDto } from './dtos/create-information-in.dto';

@Injectable()
export class InformationService {

  @Inject('INFORMATION_PAGE_SIZE')
  private pageSize: number;

  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly informationRepository: InformationRepository,
  ) {}

  async exists(informationId: number): Promise<boolean> {
    const count = await this.informationRepository.count({ id: informationId });

    return count > 0;
  }

  async findAll(page = 1): Promise<Information[]> {
    return this.informationRepository.findAll(page, this.pageSize);
  }

  async findById(id: number): Promise<Information> {
    return this.informationRepository.findOne(id);
  }

  async findByUrl(url: string): Promise<Information> {
    return this.informationRepository.findOne({ url });
  }

  async findByYoutubeId(youtubeId: string): Promise<Information> {
    return this.informationRepository.findOne({ youtubeId });
  }

  async create(dto: CreateInformationInDto, creator: User): Promise<Information> {
    const information = new Information();

    Object.assign(information, {
      ...dto,
      youtubeId: this.youtubeService.getYoutubeId(dto.url),
      creator,
    });

    return this.informationRepository.save(information);
  }

}
