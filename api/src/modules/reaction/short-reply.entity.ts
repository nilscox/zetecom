import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from '../user/user.entity';

import { Reaction } from './reaction.entity';

export enum ShortReplyType {
  APPROVE = 'APPROVE',
  REFUTE = 'REFUTE',
  SKEPTIC = 'SKEPTIC',
}

@Entity()
@Unique(['user', 'reaction'])
export class ShortReply {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => Reaction, { nullable: false })
  reaction: Reaction;

  @Column({ type: 'enum', enum: ShortReplyType, nullable: true })
  type: ShortReplyType;

  @CreateDateColumn()
  created: Date;

}
