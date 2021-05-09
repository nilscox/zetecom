import util from 'util';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentsArea } from 'src/modules/comments-area/comments-area.entity';
import { User } from 'src/modules/user/user.entity';

import { Message } from './message.entity';
import { Reaction } from './reaction.entity';

export enum CommentStatus {
  pending = 'PENDING',
  published = 'PUBLISHED',
}

@Entity({ name: 'comment', orderBy: { created: 'DESC' } })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'enum', enum: CommentStatus })
  status: CommentStatus;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => CommentsArea, { nullable: false })
  @JoinColumn({ name: 'comments_area_id' })
  commentsArea: CommentsArea;

  @OneToMany(() => Message, (message) => message.comment)
  messages: Message[];

  @OneToOne(() => Message, (message) => message.comment, { eager: true })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.comment)
  reactions: Reaction[];

  [util.inspect.custom]() {
    let str = 'Comment#' + this.id;

    if (this.messages) {
      str += ` ("${this.messages[0].text}")`;
    } else {
      str += ' -';
    }

    return str;
  }
}
