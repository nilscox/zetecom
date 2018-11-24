import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '../../user/entities/user.entity';

@Entity()
export class Reaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  quote: string;

  @Column()
  label: number;

  @Column()
  slug: string;

  @CreateDateColumn()
  @Exclude()
  created: Date;

  @UpdateDateColumn()
  @Exclude()
  updated: Date;

  @ManyToOne(type => User, user => user.reactions)
  author: User;

}
