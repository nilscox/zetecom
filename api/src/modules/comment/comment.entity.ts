import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';

import { Message } from './message/message.entity';
import { Reaction } from './reaction/reaction.entity';

@Entity({ name: 'comment', orderBy: { created: 'DESC' } })
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => Information, { nullable: false })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ default: 0 })
  score: number;

  @OneToMany(() => Message, message => message.comment)
  messages: Message[];

  @ManyToOne(() => Comment, reaction => reaction.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany(() => Comment, reaction => reaction.parent)
  replies: Comment[];

  @OneToMany(() => Reaction, reaction => reaction.comment)
  reactions: Reaction[];

}
