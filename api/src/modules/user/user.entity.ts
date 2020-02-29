import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user', orderBy: { created: 'ASC' } })
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

  @Column()
  emailValidationToken: string;

  @Column({ default: false })
  emailValidated: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
