import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Subject } from '../subject/subject.entity';
import { SubjectService } from '../subject/subject.service';

import { Information } from './information.entity';
import { YoutubeService } from './youtube.service';
import { CreateInformationInDto } from './dtos/create-information-in.dto';

@Injectable()
export class InformationService {

  constructor(

    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,

    private readonly subjectService: SubjectService,
    private readonly youtubeService: YoutubeService,

  ) {}

  async findAll(page: number = 1): Promise<Information[]> {
    return this.informationRepository.find(
      // this.paginationService.paginationOptions(page),
    );
  }

  // deprecated
  async findOne(where: object): Promise<Information> {
    const information = await this.informationRepository.findOne({ where });

    if (!information)
      return null;

    return information;
  }

  async findById(id: number): Promise<Information> {
    return this.informationRepository.findOne(id);
  }

  async findSubjects(information: Information, sort: SortType, page: number = 1): Promise<Subject[]> {
    return this.subjectService.findAll(information, sort, page);
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
