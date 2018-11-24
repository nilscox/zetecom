import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Information } from 'Information/entities/information.entity';
import { Reaction } from 'Information/entities/reaction.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Exclude()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  nick: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  @Exclude()
  created: Date;

  @UpdateDateColumn()
  @Exclude()
  updated: Date;

  @OneToMany(type => Information, information => information.creator)
  informations: Information[];

  @OneToMany(type => Reaction, reaction => reaction.author)
  reactions: Reaction[];

}
