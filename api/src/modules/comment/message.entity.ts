import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from './comment.entity';

@Entity({ name: 'message', orderBy: { created: 'DESC' } })
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => Comment, comment => comment.messages, { nullable: false })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

}
