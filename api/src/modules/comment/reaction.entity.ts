import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from '../user/user.entity';

import { Comment } from './comment.entity';

export enum ReactionType {
  APPROVE = 'APPROVE',
  REFUTE = 'REFUTE',
  SKEPTIC = 'SKEPTIC',
}

@Entity({ name: 'reaction' })
@Unique(['user', 'comment'])
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Comment, { nullable: false })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column({ type: 'enum', enum: ReactionType, nullable: true })
  type: ReactionType;

  @CreateDateColumn()
  created: Date;

}
