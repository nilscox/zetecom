import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommentsArea } from 'src/modules/comments-area/comments-area.entity';

@Entity({ name: 'comments_area_integration' })
export class CommentsAreaIntegration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identifier: string;

  @OneToOne(() => CommentsArea, undefined, { eager: true })
  @JoinColumn({ name: 'comments_area_id' })
  commentsArea: CommentsArea;
}
