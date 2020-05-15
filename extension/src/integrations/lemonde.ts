import setupIntegration from '../integration';

const getElement = () => document.getElementsByClassName('article__content')[0] as HTMLElement;

const LEMONDE_REGEXP = /lemonde.fr\/([a-z]+)\/[a-z]+\/(\d{4}\/\d{2}\/\d{2})\/[-a-z]+_([0-9_]+).html/;

const getIdentifier = () => {
  const match = LEMONDE_REGEXP.exec(window.location.href);

  if (!match)
    return null;

  const [, topic, date, id] = match;

  return ['lemonde', topic, date.replace('/', '-'), id].join(':');
};

setupIntegration({
  getElement,
  getIdentifier,
  type: 'insert',
});
