import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';

@Entity({ name: 'information', orderBy: { created: 'ASC' } })
export class Information {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  url: string;

  @Column()
  title: string;

  @Column({ name: 'youtube_id', nullable: true })
  youtubeId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(type => Subject, subject => subject.information)
  subjects: Subject[];

  reactionsCount: number;
  subjectsCount: number;

}
