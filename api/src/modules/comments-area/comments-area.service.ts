import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { User } from '../user/user.entity';

import { CommentsAreaCreatedCommand } from './comments-area-created.command';
import { CommentsAreaIntegrationService } from './comments-area-integration/comments-area-integration.service';
import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CreateCommentsAreaInDto } from './dtos/create-comments-area-in.dto';
import { UpdateCommentsAreaInDto } from './dtos/update-comments-area-in.dto';

@Injectable()
export class CommentsAreaService {
  constructor(
    private readonly commentsAreaRepository: CommentsAreaRepository,
    private readonly commentsAreaIntegrationService: CommentsAreaIntegrationService,
    private readonly command$: CommandBus,
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

    await this.command$.execute(new CommentsAreaCreatedCommand(commentsArea, creator));

    if (dto.integrationIdentifier) {
      this.commentsAreaIntegrationService.create(commentsArea, dto.integrationIdentifier);
    }

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
