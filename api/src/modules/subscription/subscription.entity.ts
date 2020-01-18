import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Column, Unique } from 'typeorm';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { Subject } from '../subject/subject.entity';
import { Reaction } from '../reaction/reaction.entity';

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

  @ManyToOne(type => Subject, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @CreateDateColumn()
  created: Date;

}
