import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, getConnectionOptions, QueryRunner } from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { ReactionType } from '../comment/reaction.entity';
import { CommentsAreaIntegrationService } from '../comments-area/comments-area-integration/comments-area-integration.service';
import { CommentsArea } from '../comments-area/comments-area.entity';
import { CommentsAreaService } from '../comments-area/comments-area.service';
import { LoggerService } from '../logger/logger.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { CommentDto } from './dtos/Comment';
import { CommentsAreaDto } from './dtos/CommentsArea';
import { Dataset } from './dtos/Dataset';
import { UserDto } from './dtos/User';

const DB_NAME = 'cypress';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
wait;

type GetUser = (nick: string) => User;
Error.stackTraceLimit = 2000;

@Injectable()
export class CypressService {
  constructor(
    @InjectConnection('postgres')
    private readonly postgresConnection: Connection,
    @InjectConnection()
    private readonly testConnection: Connection,
    private readonly userService: UserService,
    private readonly commentsAreaService: CommentsAreaService,
    private readonly commentsAreaIntegrationService: CommentsAreaIntegrationService,
    private readonly commentsService: CommentService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('CypressService');
  }

  async dropDatabase() {
    const { logger } = this;

    if (this.testConnection.isConnected) {
      logger.log('close database connection');
      await this.testConnection.close();
    }

    const queryRunner = this.postgresConnection.createQueryRunner();

    if (!queryRunner.connection.isConnected) {
      logger.log('connect query runner');
      await queryRunner.connection.connect();
    }

    logger.log('drop database');
    await queryRunner.query(`DROP DATABASE ${DB_NAME}`);

    logger.log('create database');
    await queryRunner.query(`CREATE DATABASE ${DB_NAME}`);

    logger.log('connect to the new database');
    await this.testConnection.connect();

    logger.log('run migrations');
    await this.testConnection.runMigrations();

    logger.log('close the query runner connection');
    await queryRunner.connection.close();
  }

  async seed(data: Dataset) {
    this.logger.log('seed database');

    const users = await this.createUsers(data.users || []);

    const getUser = (nick: string) => {
      if (!users[nick]) {
        throw new BadRequestException(`cannot find user with nick "${nick}"`);
      }

      return users[nick];
    };

    await this.createCommentsAreas(data.commentsAreas || [], getUser);
  }

  private async createUsers(data: UserDto[]) {
    this.logger.log('create users');

    const users: Record<string, User> = {};

    for (const user of data) {
      users[user.nick] = await this.userService.create(user);

      if (user.roles) {
        await this.userService.updateRoles(users[user.nick], user.roles);
      }
    }

    this.logger.log(users.length + ' users created: ' + Object.keys(users).join(', '));

    return users;
  }

  private async createCommentsAreas(data: CommentsAreaDto[], getUser: GetUser) {
    this.logger.log('create comments areas');

    for (const { creator: creatorNick, ...commentsArea } of data) {
      const creator = creatorNick !== undefined ? getUser(creatorNick) : undefined;

      const created = await this.commentsAreaService.create(
        {
          informationUrl: 'https://info,url',
          informationTitle: 'Fake news!',
          informationAuthor: 'Anyone',
          ...commentsArea,
        },
        creator,
      );

      if (commentsArea.identifier) {
        await this.commentsAreaIntegrationService.create(created, commentsArea.identifier);
      }

      for (const comment of commentsArea.comments || []) {
        await this.createComment(comment, created, null, getUser);
      }
    }

    this.logger.log(data.length + ' comments areas created');
  }

  private async createComment(
    comment: CommentDto,
    commentsArea: CommentsArea,
    parent: Comment | null,
    getUser: GetUser,
  ) {
    const created = await this.commentsService.create(
      comment.author !== undefined ? getUser(comment.author) : undefined,
      commentsArea,
      parent,
      comment.text,
    );

    for (const text of comment.history || []) {
      await this.commentsService.update(created, text);
    }

    if (comment.reactions) {
      for (const type of [ReactionType.APPROVE, ReactionType.REFUTE, ReactionType.SKEPTIC]) {
        for (const nick of comment.reactions[type] || []) {
          await this.commentsService.setReaction(created, getUser(nick), type);
        }
      }
    }

    for (const reply of comment.replies || []) {
      await this.createComment(reply, commentsArea, created, getUser);
    }
  }
}
