import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { Message } from './message.entity';
import { ShortReply, ShortReplyType } from './short-reply.entity';

@Entity({ name: 'reaction', orderBy: { created: 'DESC' } })
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  quote: string;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(type => Information, information => information.reactions, { nullable: false })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @OneToMany(type => Message, message => message.reaction, { eager: true })
  messages: Message[];

  @ManyToOne(type => Reaction, reaction => reaction.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
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
