import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Reaction)
  reaction: Reaction;

  @CreateDateColumn()
  created: Date;
}
