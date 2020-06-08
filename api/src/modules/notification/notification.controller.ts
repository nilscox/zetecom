import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { Output, PaginatedOutput } from 'Common/output.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';

import { NotificationOutDto } from './dtos/notification-out.dto';
import { NotificationsCountOutDto } from './dtos/notifications-count-out.dto';
import { Notification, NotificationType } from './notification.entity';
import { NotificationService } from './notification.service';

type GenericNotification = Notification<NotificationType>;

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService<NotificationType.SUBSCRIPTION_REPLY>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<GenericNotification>,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @PaginatedOutput(NotificationOutDto)
  findUnseenForUser(
    @AuthUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<GenericNotification>> {
    return this.notificationService.findForUser(user, page);
  }

  @Get('me/count')
  @UseGuards(IsAuthenticated)
  @Output(NotificationsCountOutDto)
  async countUnseenForUser(
    @AuthUser() user: User,
  ): Promise<{ count: number }> {
    return {
      count: await this.notificationService.countUnseenForUser(user),
    };
  }

  @Post(':id/seen')
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsSeen(
    @Param('id', new ParseIntPipe()) id: number,
    @AuthUser() user: User,
  ): Promise<void> {
    const notification = await this.notificationRepository.findOne(id, { relations: ['user'] });

    if (!notification)
      throw new NotFoundException();

    if (user.id !== notification.user.id)
      throw new NotFoundException();

    notification.seen = new Date();

    await this.notificationRepository.save(notification);
  }

}
