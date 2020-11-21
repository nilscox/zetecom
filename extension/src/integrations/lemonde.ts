import setupIntegration, { Integration } from '../integration';

const getElement = () => document.getElementsByClassName('article__content')[0] as HTMLElement;

const LEMONDE_REGEXP = /lemonde\.fr\/([-a-z]+)\/[a-z]+\/(\d{4}\/\d{2}\/\d{2})\/[-a-z0-9]+_([0-9_]+)\.html/;

export const getIdentifier = (url: string) => {
  const match = LEMONDE_REGEXP.exec(url);

  if (!match)
    return null;

  const [, topic, date, id] = match;

  return ['lemonde', topic, date.replace(/\//g, '-'), id].join(':');
};

const lemonde: Integration = {
  getElement,
  getIdentifier,
  healthcheck: () => true,
  type: 'insert',
};

export default lemonde;
