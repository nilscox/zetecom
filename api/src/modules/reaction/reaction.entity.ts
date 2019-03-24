import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { Message } from './message.entity';

@Entity()
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  quote: string;

  @Column()
  label: number;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // not @Column(), ok ?
  repliesCount?: number;

  @ManyToOne(type => User, { eager: true })
  author: User;

  @ManyToOne(type => Information, information => information.reactions)
  information: Information;

  @OneToMany(type => Message, message => message.reaction, { eager: true })
  messages: Message[];

  @ManyToOne(type => Reaction, reaction => reaction.replies)
  parent: Reaction;

  @OneToMany(type => Reaction, reaction => reaction.parent)
  replies: Reaction[];

}
