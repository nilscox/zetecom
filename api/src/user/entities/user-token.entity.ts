import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

import { User } from './user.entity';

@Entity()
@Exclude()
export class UserToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Expose()
  token: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.tokens)
  user: User;

}
