import { Entity, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Column } from 'typeorm';

import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { Message } from './message.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { Information } from '../information/information.entity';

@Entity({ name: 'reaction', orderBy: { created: 'DESC' } })
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(type => Information, { nullable: false, eager: true })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @ManyToOne(type => Subject, subject => subject.reactions, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(type => Message, message => message.reaction, { eager: true })
  messages: Message[];

  @ManyToOne(type => Reaction, reaction => reaction.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Reaction;

  @OneToMany(type => Reaction, reaction => reaction.parent)
  replies: Reaction[];

  @OneToMany(type => QuickReaction, sr => sr.reaction)
  quickReactions: QuickReaction[];

  // not @Column(), ok ?
  repliesCount?: number;

  quickReactionsCount?: { [key in QuickReactionType]: number };

  userQuickReaction?: QuickReactionType;

  bookmarked?: boolean;
}
