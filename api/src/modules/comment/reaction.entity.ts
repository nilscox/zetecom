import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from 'src/modules/user/user.entity';

import { Comment } from './comment.entity';

export enum ReactionType {
  like = 'like',
  approve = 'approve',
  think = 'think',
  disagree = 'disagree',
  dontUnderstand = 'dontUnderstand',
}

@Entity({ name: 'reaction' })
@Unique(['user', 'comment'])
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, { nullable: false })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column({ type: 'enum', enum: ReactionType, nullable: true })
  type: ReactionType;

  @CreateDateColumn()
  created: Date;
}
