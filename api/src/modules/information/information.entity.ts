import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../user/user.entity';

@Entity({ name: 'information', orderBy: { created: 'ASC' } })
export class Information {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  identifier: string;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  url: string;

  @Column({ name: 'image_url', nullable: true })
  @Expose()
  imageUrl: string;

  @Column({ type: 'date', nullable: true })
  @Expose()
  published: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Expose()
  commentsCount: number;

}
