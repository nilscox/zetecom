import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Reaction } from './reaction.entity';

@Entity({ name: 'message', orderBy: { created: 'ASC' } })
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => Reaction, reaction => reaction.messages, { nullable: true })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

}
