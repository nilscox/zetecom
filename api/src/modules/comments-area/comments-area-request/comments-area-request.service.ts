import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';

import { NotificationService } from '../../notification/notification.service';
import { NotificationType } from '../../notification/notification-type';
import { User } from '../../user/user.entity';
import { CommentsArea } from '../comments-area.entity';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';
import { CommentsAreaRequestInDto } from './dtos/comments-area-request-in.dto';

@Injectable()
export class CommentsAreaRequestService {
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(CommentsAreaRequest)
    private readonly commentsAreaRequestRepository: Repository<CommentsAreaRequest>,
  ) {}

  async findRequest(requestId: number) {
    return this.commentsAreaRequestRepository.findOne(requestId);
  }

  async findRequestsPaginated(page: number, pageSize: number) {
    return this.commentsAreaRequestRepository.findAndCount({
      where: {
        status: CommentsAreaRequestStatus.PENDING,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async request(dto: CommentsAreaRequestInDto, requester: User): Promise<CommentsAreaRequest> {
    return this.commentsAreaRequestRepository.save({
      ...dto,
      status: CommentsAreaRequestStatus.PENDING,
      requester,
    });
  }

  async approveAll(commentsArea: CommentsArea, moderator: User): Promise<void> {
    const findCondition: FindConditions<CommentsAreaRequest> = {
      informationUrl: commentsArea.informationUrl,
      status: CommentsAreaRequestStatus.PENDING,
    };

    const requests = await this.commentsAreaRequestRepository.find(findCondition);

    await this.commentsAreaRequestRepository.update(findCondition, {
      status: CommentsAreaRequestStatus.APPROVED,
      commentsArea,
      moderator,
    });

    await this.notificationService.createMultiple(
      NotificationType.COMMENTS_AREA_REQUEST_APPROVED,
      requests.map(({ requester }) => requester),
      {
        requestedInformationUrl: commentsArea.informationUrl,
        commentsAreaId: commentsArea.id,
        commentsAreaImageUrl: commentsArea.imageUrl,
        commentsAreaTitle: commentsArea.informationTitle,
      },
    );
  }

  async reject(request: CommentsAreaRequest, moderator: User, reason?: string): Promise<void> {
    await this.commentsAreaRequestRepository.update(request.id, {
      status: CommentsAreaRequestStatus.REJECTED,
      moderator,
    });

    await this.notificationService.create(NotificationType.COMMENTS_AREA_REQUEST_REJECTED, request.requester, {
      requestId: request.id,
      requestedInformationUrl: request.informationUrl,
      reason,
    });
  }
}
