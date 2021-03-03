import { medias } from 'src/domain/medias/medias';

import { Comment } from './Comment';

export type MediaType = keyof typeof medias;

export type CommentsAreaInformation = {
  media: MediaType;
  url: string;
  title: string;
  author: string;
  publicationDate?: string;
};

export type CommentsArea = {
  id: number;
  information: CommentsAreaInformation;
  commentsCount: number;
  comments?: Comment[];
};

export type CommentsAreaRequest = {
  id: number;
  informationUrl: string;
  informationTitle?: string;
  informationAuthor?: string;
  informationPublicationDate?: string;
  identifier?: string;
  imageUrl?: string;
};
