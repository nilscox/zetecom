import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'User/entities/user.entity';

import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';
import { ReactionService } from '../services/reaction.service';
import { SlugService } from '../services/slug.service';
import { YoutubeService } from '../services/youtube.service';
import { PaginationService } from '../services/pagination.service';

import * as labels from 'Utils/labels';

export interface ReactionsCountByLabel {
  label: string,
  count: number,
}

@Injectable()
export class InformationService {

  constructor(

    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    private readonly reactionService: ReactionService,
    private readonly slugService: SlugService,
    private readonly youtubeService: YoutubeService,
    private readonly paginationService: PaginationService,

  ) {}

  async findAll(page: number = 1): Promise<Information[]> {
    return await this.informationRepository.find(
      this.paginationService.paginationOptions(page),
    );
  }

  async findOne(where: object): Promise<Information> {
    const information = await this.informationRepository.findOne({ where });

    if (!information)
      return null;

    return information;
  }

  async findRootReactions(information: Information, page: number = 1): Promise<Reaction[]> {
    return this.reactionService.addAnswersCounts(await this.reactionRepository.find({
      where: { information, parent: null },
      ...this.paginationService.paginationOptions(page),
    }));
  }

  async getTotalReactionsByLabel(information: Information): Promise<ReactionsCountByLabel[]> {
    const result = await this.reactionRepository.createQueryBuilder('reaction')
      .select('COUNT(id)', 'count')
      .addSelect('reaction.label')
      .groupBy('reaction.label')
      .orderBy('reaction.label')
      .where('"informationId" = :id', { id: information.id })
      .getRawMany();

    return result.map(r => ({
      label: labels.labelName(r.reaction_label),
      count: parseInt(r.count, 10),
    }));
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
