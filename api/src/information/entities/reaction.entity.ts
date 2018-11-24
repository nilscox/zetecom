import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from 'User/entities/user.entity';
import { Information } from './information.entity';

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

  @ManyToOne(type => Information, information => information.reactions)
  information: Information;

}
