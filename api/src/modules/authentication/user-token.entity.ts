import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

import { User } from '../user/user.entity';

@Entity({ name: 'user_token', orderBy: { created: 'DESC' } })
export class UserToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'user_id'})
  user: User;

}
