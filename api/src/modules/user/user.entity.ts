import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  nick: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
