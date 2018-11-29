import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'User/entities/user.entity';

import { Information } from '../entities/information.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';
import { SlugService } from '../services/slug.service';
import { YoutubeService } from '../services/youtube.service';

@Injectable()
export class InformationService {

  constructor(
    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,
    private readonly slugService: SlugService,
    private readonly youtubeService: YoutubeService,
  ) {}

  async findAll(): Promise<Information[]> {
    return await this.informationRepository.find();
  }

  async findOne(where: object): Promise<Information> {
    return await this.informationRepository.createQueryBuilder('information')
      .leftJoinAndSelect('information.reactions', 'reactions', 'reactions."parentId" IS NULL')
      .leftJoinAndSelect('information.creator', 'creator')
      .leftJoinAndSelect('reactions.messages', 'messages')
      .where(where)
      .getOne();
  }

  findBySlug(slug: string): Promise<Information> {
    return this.findOne({ slug });
  }

  findByYoutubeId(youtubeId: string): Promise<Information> {
    return this.findOne({ youtubeId });
  }

  async create(createInformationDto: CreateInformationDto, creator: User): Promise<Information> {
    const information = new Information();

    Object.assign(information, {
      ...createInformationDto,
      slug: this.slugService.slugify(createInformationDto.title),
      youtubeId: this.youtubeService.getYoutubeId(createInformationDto.url),
      creator,
    });

    return await this.informationRepository.save(information);
  }

}
