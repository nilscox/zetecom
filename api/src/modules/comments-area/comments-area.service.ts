import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CreateCommentsAreaInDto } from './dtos/create-comments-area-in.dto';
import { OpenCommentsAreaRequestInDto } from './dtos/open-comments-area-request-in.dto';
import { UpdateCommentsAreaInDto } from './dtos/update-comments-area-in.dto';
import { OpenCommentsAreaRequest, OpenCommentsAreaRequestStatus } from './open-comments-area-request.entity';

@Injectable()
export class CommentsAreaService {

  constructor(
    private readonly commentsAreaRepository: CommentsAreaRepository,
    @InjectRepository(OpenCommentsAreaRequest)
    private readonly openCommentsAreaRequestRepository: Repository<OpenCommentsAreaRequest>,
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

  async findByIdentifier(identifier: string): Promise<CommentsArea | undefined> {
    return this.commentsAreaRepository.findOne({ identifier });
  }

  async create(dto: CreateCommentsAreaInDto, creator: User): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaRepository.save({
      ...dto,
      creator,
    });

    await this.openCommentsAreaRequestRepository.update({
      identifier: commentsArea.identifier,
    }, {
      status: OpenCommentsAreaRequestStatus.APPROVED,
    });

    return commentsArea;
  }

  async update(commentsArea: CommentsArea, dto: UpdateCommentsAreaInDto): Promise<CommentsArea> {
    Object.assign(commentsArea, dto);

    return this.commentsAreaRepository.save(commentsArea);
  }

  async getCommentsCounts(CommentsAreasIds: number[]) {
    return this.commentsAreaRepository.getCommentsCounts(CommentsAreasIds);
  }

  async findRequest(requestId: number) {
    return this.openCommentsAreaRequestRepository.findOne(requestId);
  }

  async findRequestsPaginated(page: number, pageSize: number) {
    return this.openCommentsAreaRequestRepository.findAndCount({
      where: {
        status: OpenCommentsAreaRequestStatus.PENDING,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async request(dto: OpenCommentsAreaRequestInDto, requester: User): Promise<OpenCommentsAreaRequest> {
    const existingRequest = await this.openCommentsAreaRequestRepository.count({
      where: { requester, identifier: dto.identifier },
    });

    if (existingRequest > 0) {
      throw new BadRequestException('REQUEST_ALREADY_REGISTERED');
    }

    return this.openCommentsAreaRequestRepository.save({
      ...dto,
      status: OpenCommentsAreaRequestStatus.PENDING,
      requester,
    });
  }

  async reject(request: OpenCommentsAreaRequest) {
    await this.openCommentsAreaRequestRepository.update(request.id, {
      status: OpenCommentsAreaRequestStatus.REFUSED,
    });

    return this.findRequest(request.id);
  }

}
