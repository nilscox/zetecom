import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Expose, Exclude, Type } from 'class-transformer';

import { Reaction } from './reaction.entity';

@Entity()
@Exclude()
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @Expose()
  text: string;

  @CreateDateColumn()
  @Expose({ name: 'date' })
  @Type(() => Date)
  created: Date;

  @ManyToOne(type => Reaction, reaction => reaction.messages)
  reaction: Reaction;

}
