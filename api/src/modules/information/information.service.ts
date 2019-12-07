import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { InformationRepository } from './information.repository';
import { SubjectRepository } from '../subject/subject.repository';

import { Information } from './information.entity';
import { YoutubeService } from './youtube.service';
import { CreateInformationInDto } from './dtos/create-information-in.dto';

@Injectable()
export class InformationService {

  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly informationRepository: InformationRepository,
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async exists(informationId: number): Promise<boolean> {
    const count = await this.informationRepository.count({ id: informationId });

    return count > 0;
  }

  async findAll(page = 1): Promise<Information[]> {
    return this.informationRepository.listInformations(page);
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

  async findSubjects(informationId: number, page = 1): Promise<Subject[]> {
    return this.subjectRepository.listSubjects(informationId, page);
  }

  async searchSubjects(informationId: number, search: string, page = 1): Promise<Subject[]> {
    return this.subjectRepository.searchSubjects(informationId, search, page);
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
