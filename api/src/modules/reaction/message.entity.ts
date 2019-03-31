import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

import { Reaction } from './reaction.entity';

@Entity({ name: 'reaction_message', orderBy: { created: 'ASC' } })
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  created: Date;

  // TODO: nullable: false
  @ManyToOne(type => Reaction, reaction => reaction.messages, { nullable: true })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

}
