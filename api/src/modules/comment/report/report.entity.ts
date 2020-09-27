import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';

export enum ReportModerationAction {
  IGNORED = 'IGNORED',
  DELETED = 'DELETED',
}

@Entity({ name: 'report' })
@Unique(['reportedBy', 'comment'])
export class Report {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({ name: 'reporter_id' })
  reportedBy: User;

  @ManyToOne(type => Comment, { eager: true })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column({ type: 'text', nullable: true })
  message: string;

  @ManyToOne(type => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'moderator_id' })
  moderatedBy: User;

  @Column({ type: 'enum', enum: ReportModerationAction, nullable: true })
  moderationAction: ReportModerationAction;

  @CreateDateColumn()
  created: Date;

}
