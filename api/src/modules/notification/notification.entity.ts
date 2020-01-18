import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, CreateDateColumn } from 'typeorm';

import { Subscription } from '../subscription/subscription.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'notification' })
export class Notification {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Subscription, { nullable: false })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'actor_id' })
  actor: User;

  @Column({ nullable: true })
  seen: Date;

  @CreateDateColumn()
  created: Date;

}
