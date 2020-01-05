import {
  Controller,
  Get,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageQuery } from 'Common/page-query.decorator';

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  findUnseenForUser(
    @ReqUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<Notification>> {
    return this.notificationService.findForUser(user, false, page);
  }

  @Get('me/seen')
  @UseGuards(IsAuthenticated)
  findSseenForUser(
    @ReqUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<Notification>> {
    return this.notificationService.findForUser(user, true, page);
  }

  @Post(':id/seen')
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsSeen(
    @Param('id', new ParseIntPipe()) id: number,
    @ReqUser() user: User,
  ): Promise<void> {
    const notification = await this.notificationRepository.findOne(id, { relations: ['subscription', 'subscription.user'] });

    if (!notification)
      throw new NotFoundException();

    if (user.id !== notification.subscription.user.id)
      throw new UnauthorizedException();

    notification.seen = new Date();

    await this.notificationRepository.save(notification);
  }

}