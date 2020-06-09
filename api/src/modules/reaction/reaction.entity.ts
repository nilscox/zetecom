import { Expose, Type } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Information } from '../information/information.entity';
import { User, UserLight } from '../user/user.entity';

import { Message } from './message.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';

export class QuickReactionsCountDto {

  @Expose()
  APPROVE: number;

  @Expose()
  REFUTE: number;

  @Expose()
  SKEPTIC: number;

}

export class ReactionEditionOutDto {

  @Expose()
  text: string;

  @Expose({ name: 'date' })
  created: Date;

}

@Entity({ name: 'reaction', orderBy: { created: 'DESC' } })
export class Reaction {

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

  @OneToMany(type => Message, message => message.reaction)
  @Expose()
  @Type(() => ReactionEditionOutDto)
  history: Message[];

  @OneToOne(type => Message, message => message.reaction, { eager: true })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ManyToOne(type => Reaction, reaction => reaction.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Reaction;

  @OneToMany(type => Reaction, reaction => reaction.parent)
  replies: Reaction[];

  @OneToMany(type => QuickReaction, sr => sr.reaction)
  quickReactions: QuickReaction[];

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
  @Type(() => QuickReactionsCountDto)
  quickReactionsCount?: { [key in QuickReactionType]: number };

  @Expose()
  userQuickReaction?: QuickReactionType;

  @Expose()
  subscribed?: boolean;

}
