import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Reaction } from 'src/modules/comment/reaction.entity';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';

import { Message } from './message.entity';

@Entity({ name: 'comment', orderBy: { created: 'DESC' } })
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ default: 0 })
  score: number;

  // TODO: eager: false
  @ManyToOne(type => Information, { nullable: false, eager: true })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @OneToMany(type => Message, message => message.comment)
  messages: Message[];

  @ManyToOne(type => Comment, comment => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  replies: Comment[];

  @OneToMany(type => Reaction, reaction => reaction.comment)
  reactions: Reaction[];

}
