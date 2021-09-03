import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

export interface Information {
  id: string;
  url: string;
  title: string;
  author: string;
  publicationDate?: Date;
}

export const createInformation: Factory<Information> = (overrides = {}) => ({
  id: createId(),
  author: 'author',
  title: 'title',
  url: 'url',
  ...overrides,
});
