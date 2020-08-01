import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';

export enum ReactionType {
  APPROVE = 'APPROVE',
  REFUTE = 'REFUTE',
  SKEPTIC = 'SKEPTIC',
}

@Entity({ name: 'reaction' })
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Comment)
  comment: Comment;

  @Column({ type: 'enum', enum: ReactionType, nullable: true })
  type: ReactionType;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
