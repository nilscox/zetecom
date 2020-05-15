import setupIntegration from '../integration';

const getElement = () => document.getElementsByClassName('article__content')[0] as HTMLElement;

setupIntegration({
  getElement,
  type: 'insert',
});
