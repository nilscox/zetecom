import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../user/user.entity';
import { CommentsArea } from '../comments-area.entity';

export enum CommentsAreaRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
}

// TODO: add moderator
@Entity({ name: 'comments_area_request', orderBy: { created: 'ASC' } })
export class CommentsAreaRequest {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @ManyToOne(type => CommentsArea, { nullable: true })
  @JoinColumn({ name: 'comments_area_id' })
  commentsArea: CommentsArea;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'enum', enum: CommentsAreaRequestStatus })
  status: CommentsAreaRequestStatus;

}
