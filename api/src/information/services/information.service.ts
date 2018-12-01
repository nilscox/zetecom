import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'User/entities/user.entity';

import { Information } from '../entities/information.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';
import { SlugService } from '../services/slug.service';
import { YoutubeService } from '../services/youtube.service';

export interface FindInformationOpts {
  rootReactions?: boolean;
  creator?: boolean;
}

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

  async findOne(where: object, opts: FindInformationOpts = {}): Promise<Information> {
    let qb = this.informationRepository.createQueryBuilder('information')
      .where(where);

    if (opts.rootReactions) {
      qb = qb.leftJoinAndSelect('information.reactions', 'reactions', 'reactions."parentId" IS NULL')
        .leftJoinAndSelect('reactions.messages', 'messages');
    }

    if (opts.creator)
      qb = qb.leftJoinAndSelect('information.creator', 'creator');

    return await qb.getOne();
  }

  findById(id: number, opts: FindInformationOpts): Promise<Information> {
    return this.findOne({ id }, opts);
  }

  findBySlug(slug: string, opts: FindInformationOpts): Promise<Information> {
    return this.findOne({ slug }, opts);
  }

  findByYoutubeId(youtubeId: string, opts: FindInformationOpts): Promise<Information> {
    return this.findOne({ youtubeId }, opts);
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
