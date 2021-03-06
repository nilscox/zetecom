import { Expose, Type } from 'class-transformer';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Comment } from 'src/modules/comment/comment.entity';
import { User } from 'src/modules/user/user.entity';

@Entity({ name: 'subscription' })
@Unique(['user', 'comment'])
export class Subscription {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'comment_id' })
  @Expose()
  @Type(() => Comment)
  comment: Comment;

  @CreateDateColumn()
  @Expose({ name: 'date' })
  created: Date;

}
