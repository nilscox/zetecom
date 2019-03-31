import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';

@Entity({ name: 'information', orderBy: { created: 'ASC' } })
export class Information {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ name: 'youtube_id', nullable: true })
  youtubeId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(type => Reaction, reaction => reaction.information)
  reactions: Reaction[];

}
