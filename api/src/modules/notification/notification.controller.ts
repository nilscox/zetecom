import {
  Body,
  Controller,
  ForbiddenException,
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
import { Repository } from 'typeorm';

import { IsAuthenticated } from 'src/common/auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CastToDto } from 'src/common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { PageQuery } from 'src/common/page-query.decorator';
import { PageSizeQuery } from 'src/common/page-size-query.decorator';
import { Paginated } from 'src/common/paginated';
import { Roles } from 'src/common/roles.decorator';
import { SearchQuery } from 'src/common/search-query.decorator';
import { Role } from 'src/modules/authorization/roles.enum';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

import { NotificationDto } from './dtos/notification.dto';
import { NotificationsCountDto } from './dtos/notifications-count.dto';
import { RulesUpdateInDto } from './dtos/rules-update-in.dto';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification-type';

@Controller('notification')
@UseInterceptors(ClassToPlainInterceptor)
export class NotificationController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @CastToDto(NotificationDto)
  async findForUser(
    @AuthUser() user: User,
    @PageQuery() page: number,
    @PageSizeQuery() pageSize: number,
    @SearchQuery() search?: string,
  ): Promise<Paginated<Notification>> {
    return this.notificationService.findForUser(user, page, pageSize, search);
  }

  @Get('me/count')
  @UseGuards(IsAuthenticated)
  @CastToDto(NotificationsCountDto)
  async countUnseenForUser(@AuthUser() user: User): Promise<{ count: number }> {
    return { count: await this.notificationService.countUnseenForUser(user) };
  }

  @Post(':id/seen')
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsSeen(@Param('id', new ParseIntPipe()) id: number, @AuthUser() user: User): Promise<void> {
    const notification = await this.notificationRepository.findOne(id, { relations: ['user'] });

    if (!notification) {
      throw new NotFoundException();
    }

    if (user.id !== notification.user.id) {
      throw new ForbiddenException();
    }

    notification.seen = new Date();

    await this.notificationRepository.save(notification);
  }

  @Post('rules-update')
  @UseGuards(IsAuthenticated)
  @Roles(Role.ADMIN)
  @HttpCode(204)
  async rulesUpdate(@Body() { version }: RulesUpdateInDto): Promise<void> {
    const users = await this.userService.findAll();

    await this.notificationService.createMultiple(NotificationType.RULES_UPDATE, users, { version });
  }
}
