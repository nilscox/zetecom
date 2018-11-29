import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

import { Information } from 'Information/entities/information.entity';
import { Reaction } from 'Information/entities/reaction.entity';

@Entity()
@Exclude()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Expose()
  nick: string;

  @Column({ nullable: true })
  @Expose()
  avatar: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Information, information => information.creator)
  informations: Information[];

  @OneToMany(type => Reaction, reaction => reaction.author)
  reactions: Reaction[];

}
