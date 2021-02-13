import { Type } from 'class-transformer';

import { Comment } from './Comment';

export type MediaType =
  | '20minutes'
  | 'francesoir'
  | 'lefigaro'
  | 'lemonde'
  | 'leparisien'
  | 'lepoint'
  | 'lesechos'
  | 'liberation'
  | 'scienceetvie'
  | 'skeptikon'
  | 'unknown'
  | 'youtube';

export class CommentsAreaInformation {
  media: MediaType;

  url: string;

  title: string;

  author: string;

  @Type(() => Date)
  publicationDate?: Date;
}

export class CommentsArea {
  id: number;

  @Type(() => CommentsAreaInformation)
  information: CommentsAreaInformation;

  commentsCount: number;

  @Type(() => Comment)
  comments?: Comment[];
}

export class CommentsAreaRequest {
  id: number;

  informationUrl: string;

  informationTitle?: string;

  informationAuthor?: string;

  informationPublicationDate?: string;

  identifier?: string;

  imageUrl?: string;
}
