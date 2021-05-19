import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommentsArea } from 'src/modules/comments-area/comments-area.entity';

export enum MediaType {
  _20minutes = '20minutes',
  francesoir = 'francesoir',
  lefigaro = 'lefigaro',
  lemonde = 'lemonde',
  leparisien = 'leparisien',
  lepoint = 'lepoint',
  lesechos = 'lesechos',
  liberation = 'liberation',
  scienceetvie = 'scienceetvie',
  skeptikon = 'skeptikon',
  youtube = 'youtube',
}

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
