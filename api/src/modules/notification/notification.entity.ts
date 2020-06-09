import { Expose, Type } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User, UserLight } from '../user/user.entity';

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
    author: UserLight;
    text: string;
  };
};

class NotificationPayloadDto {}

class RulesUpdatePayloadDto extends NotificationPayloadDto {
  @Expose()
  version: string;
}

class SubscriptionReplyPayloadDto extends NotificationPayloadDto {

  @Expose()
  informationId: number;

  @Expose()
  reactionId: number;

  @Expose()
  replyId: number;

  @Expose()
  @Type(() => UserLight)
  author: UserLight;

  @Expose()
  text: string;
}

const mapNotificationTypePayload = {
  [NotificationType.RULES_UPDATE]: RulesUpdatePayloadDto,
  [NotificationType.SUBSCRIPTION_REPLY]: SubscriptionReplyPayloadDto,
};

@Entity({ name: 'notification' })
export class Notification<T extends NotificationType> {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ type: 'enum', enum: NotificationType })
  @Expose()
  type: NotificationType;

  @Column({ type: 'json' })
  @Expose()
  @Type(({ object }: any) => mapNotificationTypePayload[object.type])
  payload: NotificationPayload[T];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  @Expose()
  seen: Date;

  @CreateDateColumn()
  @Expose()
  created: Date;

}

export class SubscriptionReplyNotification extends Notification<NotificationType.SUBSCRIPTION_REPLY> {}
