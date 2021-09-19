import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

export interface Information {
  id: string;
  media: string;
  url: string;
  title: string;
  author?: string;
  publicationDate?: Date;
}

export const createInformation: Factory<Information> = (overrides = {}) => ({
  id: createId(),
  media: 'media',
  title: 'title',
  url: 'url',
  ...overrides,
});
