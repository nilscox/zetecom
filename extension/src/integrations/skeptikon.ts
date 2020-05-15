import setupIntegration from '../integration';

const getElement = () => document.querySelector<HTMLElement>('my-video-comments');

setupIntegration({
  getElement,
  type: 'switch',
  originalText: 'Commentaires Skepitkón',
  integrationText: 'Commentaires Réagir à l\'information',
  darkMode: true,
});
