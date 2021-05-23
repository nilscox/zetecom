import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentsAreaInformation } from './comments-area-information.entity';

export enum CommentsAreaStatus {
  requested = 'REQUESTED',
  open = 'OPEN',
}

@Entity({ name: 'comments_area', orderBy: { created: 'ASC' } })
export class CommentsArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: CommentsAreaStatus })
  status: CommentsAreaStatus;

  @OneToOne(() => CommentsAreaInformation, { eager: true })
  @JoinColumn({ name: 'information_id' })
  information?: CommentsAreaInformation;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
