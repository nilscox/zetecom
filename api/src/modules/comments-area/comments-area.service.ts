import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';

import { CommentsAreaRequestService } from './comments-area-request/comments-area-request.service';
import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CreateCommentsAreaInDto } from './dtos/create-comments-area-in.dto';
import { UpdateCommentsAreaInDto } from './dtos/update-comments-area-in.dto';

@Injectable()
export class CommentsAreaService {
  constructor(
    private readonly commentsAreaRepository: CommentsAreaRepository,
    private readonly commentsAreaRequestService: CommentsAreaRequestService,
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

  async create(dto: CreateCommentsAreaInDto, creator: User): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaRepository.save({
      ...dto,
      creator,
    });

    return commentsArea;
  }

  async update(commentsArea: CommentsArea, dto: UpdateCommentsAreaInDto): Promise<CommentsArea> {
    Object.assign(commentsArea, dto);

    await this.commentsAreaRepository.save(commentsArea);

    return this.findById(commentsArea.id);
  }

  async getCommentsCounts(CommentsAreasIds: number[]) {
    return this.commentsAreaRepository.getCommentsCounts(CommentsAreasIds);
  }
}
