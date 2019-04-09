import { Column, JoinColumn, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from '../user/user.entity';

import { Reaction } from './reaction.entity';

export enum ReportType {
  MISINFORMATION = 'MISINFORMATION',
  RULES_VIOLATION = 'RULES_VIOLATION',
  OTHER = 'OTHER',
}

@Entity({ name: 'report' })
@Unique(['user', 'reaction'])
export class Report {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction, { nullable: false })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @Column({ type: 'enum', enum: ReportType, nullable: false })
  type: ReportType;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  created: Date;

}
