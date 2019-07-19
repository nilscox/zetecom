import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReactionSortType } from 'Utils/reaction-sort-type';

import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionService } from '../reaction/reaction.service';

import { SlugService } from './services/slug.service';
import { YoutubeService } from './services/youtube.service';
import { PaginationService } from './services/pagination.service';

import { Information } from './information.entity';
import { CreateInformationInDto } from './dtos/create-information-in.dto';

@Injectable()
export class InformationService {

  constructor(

    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,

    @Inject(forwardRef(() => ReactionService))
    private readonly reactionService: ReactionService,
    private readonly slugService: SlugService,
    private readonly youtubeService: YoutubeService,
    private readonly paginationService: PaginationService,

  ) {}

  async findAll(page: number = 1): Promise<Information[]> {
    return this.informationRepository.find(
      // this.paginationService.paginationOptions(page),
    );
  }

  async findOne(where: object): Promise<Information> {
    const information = await this.informationRepository.findOne({ where });

    if (!information)
      return null;

    return information;
  }

  async findRootReactions(information: Information, sort: ReactionSortType, page: number = 1): Promise<Reaction[]> {
    return this.reactionService.findMainReactions(information.id, sort);
  }

  async create(dto: CreateInformationInDto, creator: User): Promise<Information> {
    const information = new Information();

    Object.assign(information, {
      ...dto,
      slug: this.slugService.slugify(dto.title),
      youtubeId: this.youtubeService.getYoutubeId(dto.url),
      creator,
    });

    return this.informationRepository.save(information);
  }

}
