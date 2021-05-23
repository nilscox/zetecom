import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentsArea, CommentsAreaStatus } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaInformation } from './comments-area-information.entity';
import { UpdateCommentsAreaInformationInDto } from './dtos/update-comments-area-information-in.dto';

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

  async updateInformation(commentsArea: CommentsArea, dto: UpdateCommentsAreaInformationInDto): Promise<CommentsArea> {
    Object.assign(commentsArea.information, dto);

    await this.commentsAreaInformationRepository.save(commentsArea.information);

    return this.findById(commentsArea.id);
  }
}
