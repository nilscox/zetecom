import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Reaction)
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  @CreateDateColumn()
  created: Date;
}
