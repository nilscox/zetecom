import { Expose, Type } from 'class-transformer';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'reaction_subscription' })
@Unique(['user', 'reaction'])
export class ReactionSubscription {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction, { nullable: true })
  @JoinColumn({ name: 'reaction_id' })
  @Expose()
  @Type(() => Reaction)
  reaction: Reaction;

  @CreateDateColumn()
  @Expose({ name: 'date' })
  created: Date;

}
