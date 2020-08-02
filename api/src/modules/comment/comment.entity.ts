import { Expose, Type } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Information } from '../information/information.entity';
import { User, UserLight } from '../user/user.entity';

import { Message } from './message.entity';
import { Reaction, ReactionType } from './reaction.entity';

export class ReactionsCountDto {

  @Expose()
  APPROVE: number;

  @Expose()
  REFUTE: number;

  @Expose()
  SKEPTIC: number;

}

export class CommentEditionOutDto {

  @Expose()
  text: string;

  @Expose({ name: 'date' })
  created: Date;

}

@Entity({ name: 'comment', orderBy: { created: 'DESC' } })
export class Comment {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @CreateDateColumn()
  @Expose({ name: 'date' })
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  @Expose()
  @Type(() => UserLight)
  author: User;

  @Column({ default: 0 })
  score: number;

  // TODO: eager: false
  @ManyToOne(type => Information, { nullable: false, eager: true })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @OneToMany(type => Message, message => message.comment)
  @Expose()
  @Type(() => CommentEditionOutDto)
  history: Message[];

  @OneToOne(type => Message, message => message.comment, { eager: true })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ManyToOne(type => Comment, comment => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  replies: Comment[];

  @OneToMany(type => Reaction, sr => sr.comment)
  reactions: Reaction[];

  @Expose()
  get edited(): Date | false {
    const l = this.history.length;

    if (l === 1)
      return false;

    return this.history[0].created;
  }

  @Expose()
  get text(): string {
    return this.message.text;
  }

  // not @Column(), ok ?
  @Expose()
  repliesCount?: number;

  @Expose()
  @Type(() => ReactionsCountDto)
  reactionsCount?: { [key in ReactionType]: number };

  @Expose()
  userReaction?: ReactionType;

  @Expose()
  subscribed?: boolean;

}
