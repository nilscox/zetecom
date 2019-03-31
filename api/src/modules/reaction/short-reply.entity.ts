import { Column, JoinColumn, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from '../user/user.entity';

import { Reaction } from './reaction.entity';

export enum ShortReplyType {
  APPROVE = 'APPROVE',
  REFUTE = 'REFUTE',
  SKEPTIC = 'SKEPTIC',
}

@Entity({ name: 'short_reply' })
@Unique(['user', 'reaction'])
export class ShortReply {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction, { nullable: false })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @Column({ type: 'enum', enum: ShortReplyType, nullable: true })
  type: ShortReplyType;

  @CreateDateColumn()
  created: Date;

}
