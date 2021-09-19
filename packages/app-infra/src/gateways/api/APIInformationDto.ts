import { Information } from '@zetecom/app-core';
import { createId } from '@zetecom/app-core/shared/createId';

export type APIInformationDto = {
  media: string;
  title: string;
  url: string;
  author: string;
  publicationDate: string;
};

export const transformInformation = (dto: APIInformationDto): Information => ({
  ...dto,
  id: createId(),
  publicationDate: dto.publicationDate ? new Date(dto.publicationDate) : undefined,
});
