import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/modules/user/user.entity';

export enum MediaType {
  _20minutes = '20minutes',
  francesoir = 'francesoir',
  lefigaro = 'lefigaro',
  lemonde = 'lemonde',
  leparisien = 'leparisien',
  lepoint = 'lepoint',
  lesechos = 'lesechos',
  liberation = 'liberatio',
  scienceetvie = 'scienceetvie',
  skeptikon = 'skeptikon',
  youtube = 'youtube',
}

@Entity({ name: 'comments_area', orderBy: { created: 'ASC' } })
export class CommentsArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'information_media', type: 'enum', enum: MediaType, nullable: true })
  informationMedia: MediaType;

  @Column({ name: 'information_url' })
  informationUrl: string;

  @Column({ name: 'information_title' })
  informationTitle: string;

  @Column({ name: 'information_author' })
  informationAuthor: string;

  @Column({ name: 'information_publication_date', type: 'date', nullable: true })
  informationPublicationDate: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
