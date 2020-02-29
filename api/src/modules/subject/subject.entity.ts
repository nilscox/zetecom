import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Information } from '../information/information.entity';
import { Message } from '../reaction/message.entity';
import { QuickReactionType } from '../reaction/quick-reaction.entity';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'subject', orderBy: { created: 'ASC' } })
export class Subject {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: true })
  quote: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(type => Information, information => information.subjects, { nullable: false })
  @JoinColumn({ name: 'information_id' })
  information: Information;

  @OneToMany(type => Message, message => message.subject, { eager: true })
  messages: Message[];

  @OneToMany(type => Reaction, reaction => reaction.subject)
  reactions: Reaction[];

  reactionsCount?: number;

  quickReactionsCount?: { [key in QuickReactionType]: number };
}
