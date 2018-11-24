import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from 'User/entities/user.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class Information {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  @Exclude()
  youtubeId: string;

  @CreateDateColumn()
  @Exclude()
  created: Date;

  @UpdateDateColumn()
  @Exclude()
  updated: Date;

  @ManyToOne(type => User, user => user.informations)
  creator: User;

  @OneToMany(type => Reaction, reaction => reaction.information)
  reactions: Reaction[];

}
