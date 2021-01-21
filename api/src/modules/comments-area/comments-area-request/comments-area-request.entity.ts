import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentsArea } from 'src/modules/comments-area/comments-area.entity';
import { User } from 'src/modules/user/user.entity';

export enum CommentsAreaRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity({ name: 'comments_area_request', orderBy: { created: 'ASC' } })
export class CommentsAreaRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  identifier: string;

  @Column()
  informationUrl: string;

  @Column({ nullable: true })
  informationTitle: string;

  @Column({ nullable: true })
  informationAuthor: string;

  @Column({ nullable: true })
  informationPublicationDate: string;

  @Column({ nullable: true })
  idetifier: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => CommentsArea, { nullable: true })
  @JoinColumn({ name: 'comments_area_id' })
  commentsArea: CommentsArea;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'moderator_id' })
  moderator: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'enum', enum: CommentsAreaRequestStatus })
  status: CommentsAreaRequestStatus;
}
