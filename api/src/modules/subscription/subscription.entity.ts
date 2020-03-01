import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Information } from '../information/information.entity';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'subscription' })
@Unique(['user', 'reaction'])
export class Subscription {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Information, { nullable: true })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @ManyToOne(type => Reaction, { nullable: true })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @CreateDateColumn()
  created: Date;

}
