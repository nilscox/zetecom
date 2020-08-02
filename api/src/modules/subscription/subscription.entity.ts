import { Expose, Type } from 'class-transformer';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'comment_subscription' })
@Unique(['user', 'comment'])
export class CommentSubscription {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Comment, { nullable: true })
  @JoinColumn({ name: 'comment_id' })
  @Expose()
  @Type(() => Comment)
  comment: Comment;

  @CreateDateColumn()
  @Expose({ name: 'date' })
  created: Date;

}
