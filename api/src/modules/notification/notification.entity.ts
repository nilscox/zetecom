import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/user.entity';

import { NotificationPayload } from './notification-payload';
import { NotificationType } from './notification-type';

@Entity({ name: 'notification', orderBy: { created: 'DESC' } })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ type: 'json' })
  payload: NotificationPayload[keyof NotificationPayload];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  seen: Date;

  @CreateDateColumn()
  created: Date;
}
