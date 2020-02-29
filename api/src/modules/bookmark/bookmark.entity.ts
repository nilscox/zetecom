import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction)
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @CreateDateColumn()
  created: Date;
}
