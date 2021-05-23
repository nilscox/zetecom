import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

@Entity({ name: 'comments_area_information' })
export class CommentsAreaInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MediaType, nullable: true })
  media?: MediaType;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  publicationDate?: string;

  @Column({ nullable: true })
  author?: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
