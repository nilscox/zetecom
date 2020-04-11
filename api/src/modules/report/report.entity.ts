import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'report' })
@Unique(['user', 'reaction'])
export class Report {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction, { nullable: false })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  created: Date;

}
