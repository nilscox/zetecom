import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';

@Entity()
@Exclude()
export class Information {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  url: string;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  slug: string;

  @Column({ nullable: true })
  youtubeId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { eager: true })
  @Expose()
  creator: User;

  @OneToMany(type => Reaction, reaction => reaction.information)
  @Expose()
  reactions: Reaction[];

}
