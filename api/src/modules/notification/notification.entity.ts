import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserLightOutDto } from '../user/dtos/user-light-out.dto';
import { User } from '../user/user.entity';

export enum NotificationType {
  RULES_UPDATE = 'rulesUpdate',
  SUBSCRIPTION_REPLY = 'subscriptionReply',
}

export type NotificationPayload = {
  [NotificationType.RULES_UPDATE]: {
    version: string;
  };
  [NotificationType.SUBSCRIPTION_REPLY]: {
    informationId: number;
    reactionId: number;
    replyId: number;
    author: UserLightOutDto;
    text: string;
  };
};

@Entity({ name: 'notification' })
export class Notification<T extends NotificationType> {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ type: 'json' })
  payload: NotificationPayload[T];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  seen: Date;

  @CreateDateColumn()
  created: Date;

}

export class SubscriptionReplyNotification extends Notification<NotificationType.SUBSCRIPTION_REPLY> {}
