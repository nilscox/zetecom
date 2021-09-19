import { CommentsAreaDto } from '@zetecom/app-core';

import { APIInformationDto, transformInformation } from './APIInformationDto';

export type APICommentsAreaDto = {
  id: number;
  information: APIInformationDto;
  commentsCount: number;
  informationMedia: string;
  informationTitle: string;
  informationUrl: string;
  informationAuthor: string;
  informationPublicationDate: string;
};

export const transformCommentsArea = (dto: APICommentsAreaDto): CommentsAreaDto => ({
  ...dto,
  id: String(dto.id),
  information: transformInformation(dto.information),
});
