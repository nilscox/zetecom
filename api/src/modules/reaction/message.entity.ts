import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

import { Reaction } from './reaction.entity';

@Entity()
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => Reaction, reaction => reaction.messages)
  reaction: Reaction;

}
