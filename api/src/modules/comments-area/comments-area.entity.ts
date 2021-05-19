import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
