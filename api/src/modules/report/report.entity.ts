import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'report' })
@Unique(['user', 'comment'])
export class Report {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Comment, { nullable: false })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  created: Date;

}
