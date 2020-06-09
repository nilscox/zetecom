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
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expose } from 'class-transformer';
import { Repository } from 'typeorm';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';

import { Notification, NotificationType } from './notification.entity';
import { NotificationService } from './notification.service';

type GenericNotification = Notification<NotificationType>;

class NotificationOutDto {
  constructor(private readonly _count: number) {}

  @Expose()
  get count() {
    return this._count;
  }
}

@Controller('notification')
@UseInterceptors(ClassToPlainInterceptor)
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService<NotificationType.SUBSCRIPTION_REPLY>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<GenericNotification>,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  findUnseenForUser(
    @AuthUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<GenericNotification>> {
    return this.notificationService.findForUser(user, page);
  }

  @Get('me/count')
  @UseGuards(IsAuthenticated)
  async countUnseenForUser(
    @AuthUser() user: User,
  ): Promise<NotificationOutDto> {
    return new NotificationOutDto(await this.notificationService.countUnseenForUser(user));
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
