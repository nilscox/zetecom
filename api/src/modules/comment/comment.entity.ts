import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import util from 'util';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';

import { Message } from './message.entity';
import { Reaction } from './reaction.entity';

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

  @ManyToOne(type => Information, { nullable: false })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @OneToMany(type => Message, message => message.comment)
  messages: Message[];

  @OneToOne(type => Message, message => message.comment, { eager: true })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ManyToOne(type => Comment, comment => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  replies: Comment[];

  @OneToMany(type => Reaction, reaction => reaction.comment)
  reactions: Reaction[];

  [util.inspect.custom]() {
    let str = 'Comment#' + this.id;

    if (this.messages)
      str += ` ("${this.messages[0].text}")`;
    else
      str += ' -';

    return str;
  }

}
