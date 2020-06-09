import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Role } from '../authorization/roles.enum';

@Entity({ name: 'user', orderBy: { created: 'ASC' } })
export class User {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Expose()
  nick: string;

  @Column({ nullable: true })
  @Expose()
  avatar: string;

  @Column()
  emailValidationToken: string;

  @Column({ default: false })
  emailValidated: boolean;

  @Column({ nullable: true })
  emailLoginToken: string;

  @Column({ type: 'enum', enum: Role, array: true })
  roles: Role[];

  @CreateDateColumn()
  @Expose()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}

export class UserLight extends User {
  @Exclude()
  email;

  @Exclude()
  created;
}
