import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../user/user.entity';

export enum OpenCommentsAreaRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
}

@Entity({ name: 'open_comments_area_request', orderBy: { created: 'ASC' } })
export class OpenCommentsAreaRequest {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'enum', enum: OpenCommentsAreaRequestStatus })
  status: OpenCommentsAreaRequestStatus;

}
