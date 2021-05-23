import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentsArea, CommentsAreaStatus } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaInformation } from './comments-area-information.entity';
import { UpsertCommentsAreaInformationInDto } from './dtos/upsert-comments-area-information-in.dto';

@Injectable()
export class CommentsAreaService {
  constructor(
    private readonly commentsAreaRepository: CommentsAreaRepository,
    @InjectRepository(CommentsAreaInformation)
    private readonly commentsAreaInformationRepository: Repository<CommentsAreaInformation>,
  ) {}

  async exists(commentsAreaId: number): Promise<boolean> {
    const count = await this.commentsAreaRepository.count({ id: commentsAreaId });

    return count > 0;
  }

  async findById(id: number): Promise<CommentsArea | undefined> {
    return this.commentsAreaRepository.findOne(id);
  }

  async findByIds(id: number[]): Promise<CommentsArea[]> {
    return this.commentsAreaRepository.findByIds(id);
  }

  async create(): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaRepository.save({
      status: CommentsAreaStatus.requested,
    });

    return commentsArea;
  }

  async upsertInformation(commentsArea: CommentsArea, dto: UpsertCommentsAreaInformationInDto): Promise<CommentsArea> {
    const information = Object.assign(commentsArea.information ?? {}, dto);

    const upserted = await this.commentsAreaInformationRepository.save(information);

    if (!commentsArea.information) {
      await this.commentsAreaRepository.update(commentsArea.id, { information: upserted });
    }

    return this.findById(commentsArea.id);
  }
}
