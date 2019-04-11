import { Column, JoinColumn, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from '../user/user.entity';

import { Reaction } from './reaction.entity';

export enum QuickReactionType {
  APPROVE = 'APPROVE',
  REFUTE = 'REFUTE',
  SKEPTIC = 'SKEPTIC',
}

@Entity({ name: 'quick_reaction' })
@Unique(['user', 'reaction'])
export class QuickReaction {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction, { nullable: false })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @Column({ type: 'enum', enum: QuickReactionType, nullable: true })
  type: QuickReactionType;

  @CreateDateColumn()
  created: Date;

}
