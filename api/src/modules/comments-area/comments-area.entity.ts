import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity({ name: 'comments_area', orderBy: { created: 'ASC' } })
export class CommentsArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identifier: string;

  @Column({ name: 'information_url' })
  informationUrl: string;

  @Column({ name: 'information_title' })
  informationTitle: string;

  @Column({ name: 'information_author' })
  informationAuthor: string;

  @Column({ type: 'date', nullable: true })
  published: Date;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
