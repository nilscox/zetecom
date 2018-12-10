import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'User/entities/user.entity';

import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';
import { SlugService } from '../services/slug.service';
import { YoutubeService } from '../services/youtube.service';
import { PaginationService } from '../services/pagination.service';

export interface FindAllInformationOpts {
  page?: number;
}

export interface FindInformationOpts {
  creator?: boolean;
  rootReactions?: boolean;
  reactionsPage?: number;
}

@Injectable()
export class InformationService {

  constructor(
    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
    private readonly slugService: SlugService,
    private readonly youtubeService: YoutubeService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(opts: FindAllInformationOpts = {}): Promise<Information[]> {
    return await this.informationRepository.find(
      this.paginationService.paginationOptions(opts.page || 1),
    );
  }

  async findOne(where: object, opts: FindInformationOpts = {}): Promise<Information> {
    const information = await this.informationRepository.findOne({ where });

    if (!information)
      return null;

    if (opts.rootReactions) {
      opts.reactionsPage = opts.reactionsPage || 1;

      information.reactions = await this.reactionRepository.find({
        where: { informationId: information.id, parentId: null },
        ...this.paginationService.paginationOptions(opts.reactionsPage || 1),
      });
    }

    return information;
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
