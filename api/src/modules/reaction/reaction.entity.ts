import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { Message } from './message.entity';
import { ShortReply, ShortReplyType } from './short-reply.entity';

export enum ReactionLabel {
  SOURCE = 'SOURCE',
  METHOD = 'METHOD',
}

@Entity()
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  quote: string;

  @Column({ type: 'enum', enum: ReactionLabel })
  label: ReactionLabel;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { eager: true })
  author: User;

  @ManyToOne(type => Information, information => information.reactions)
  information: Information;

  @OneToMany(type => Message, message => message.reaction, { eager: true })
  messages: Message[];

  @ManyToOne(type => Reaction, reaction => reaction.replies)
  parent: Reaction;

  @OneToMany(type => Reaction, reaction => reaction.parent)
  replies: Reaction[];

  @OneToMany(type => ShortReply, sr => sr.reaction)
  shortReplies: ShortReply[];

  // not @Column(), ok ?
  repliesCount?: number;

  shortRepliesCount?: { [key in ShortReplyType]: number };

  userShortReply?: ShortReplyType;
}
