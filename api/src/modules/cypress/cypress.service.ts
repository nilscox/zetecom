import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { CommentFactory } from '../comment/comment.factory';
import { ReactionType } from '../comment/reaction.entity';
import { ReactionFactory } from '../comment/reaction.factory';
import { CommentsArea } from '../comments-area/comments-area.entity';
import { CommentsAreaFactory } from '../comments-area/comments-area.factory';
import { LoggerService } from '../logger/logger.service';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { CommentDto } from './dtos/Comment';
import { CommentsAreaDto } from './dtos/CommentsArea';
import { Dataset } from './dtos/Dataset';
import { UserDto } from './dtos/User';

const DB_NAME = 'cypress';

const wait = (ms: number) => new Promise(r => setTimeout(r, ms)); wait;

type GetUser = (nick: string) => User;

@Injectable()
export class CypressService {
  constructor(
    @InjectConnection('postgres')
    private readonly postgresConnection: Connection,
    @InjectConnection()
    private readonly testConnection: Connection,
    private readonly userFactory: UserFactory,
    private readonly commentsAreaFactory: CommentsAreaFactory,
    private readonly commentsFactory: CommentFactory,
    private readonly reactionFactory: ReactionFactory,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('CypressService');
  }

  async dropDatabase() {
    const connectionOptions = await getConnectionOptions('default');

    this.logger.log('drop database');

    if (connectionOptions.database !== DB_NAME) {
      throw new Error(`database name is not "${DB_NAME}", aborting drop databse`);
    }

    if (this.testConnection.isConnected) {
      await this.testConnection.close();
    }

    const queryRunner = this.postgresConnection.createQueryRunner();

    await queryRunner.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${DB_NAME}' AND pid <> pg_backend_pid();
    `);

    await queryRunner.query(`DROP DATABASE ${DB_NAME}`);

    this.logger.log('create database');
    await queryRunner.query(`CREATE DATABASE ${DB_NAME}`);

    await this.testConnection.connect();

    this.logger.log('run migrations');
    await this.testConnection.runMigrations();
  }

  async seed(data: Dataset) {
    const users = await this.createUsers(data.users || []);

    this.logger.log('seed database');

    const getUser = (nick: string) => {
      if (!users[nick]) {
        throw new BadRequestException(`cannot find user with nick "${nick}"`);
      }

      return users[nick];
    };

    await this.createCommentsAreas(data.commentsAreas || [], getUser);
  }

  private async createUsers(data: UserDto[]) {
    const users: Record<string, User> = {};

    for (const user of data) {
      users[user.nick] = await this.userFactory.create(user);
    }

    return users;
  }

  private async createCommentsAreas(data: CommentsAreaDto[], getUser: GetUser) {
    for (const { creator: creatorNick, ...commentsArea } of data) {
      const creator = creatorNick !== undefined ? getUser(creatorNick) : undefined;
      const created = await this.commentsAreaFactory.create({ ...commentsArea, creator });

      for (const comment of commentsArea.comments || []) {
        await this.createComment(comment, created, null, getUser);
      }
    }
  }

  private async createComment(comment: CommentDto, commentsArea: CommentsArea, parent: Comment | null, getUser: GetUser) {
    const created = await this.commentsFactory.create({
      commentsArea,
      author: comment.author !== undefined ? getUser(comment.author) : undefined,
      text: comment.text,
      parent,
    });

    for (const text of comment.history || []) {
      await this.commentsFactory.edit(created, text);
    }

    if (comment.reactions) {
      for (const type of [ReactionType.APPROVE, ReactionType.REFUTE, ReactionType.SKEPTIC]) {
        for (const nick of comment.reactions[type] || []) {
          console.log(comment.reactions[type]);
          await this.reactionFactory.create({ comment: created, user: getUser(nick), type });
        }
      }
    }

    for (const reply of comment.replies || []) {
      await this.createComment(reply, commentsArea, created, getUser);
    }
  }
}
