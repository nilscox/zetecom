import setupIntegration from '../integration';

const getElement = () => document.querySelector<HTMLElement>('my-video-comments');

const getIdentifier = () => {
  const match = /watch\/([-a-z0-9]+)/.exec(window.location.href);

  if (!match)
    return null;

  return ['skeptikon', match[1]].join(':');
};

setupIntegration({
  getElement,
  getIdentifier,
  type: 'switch',
  originalText: 'Commentaires Skepitkón',
  integrationText: 'Commentaires Réagir à l\'information',
  darkMode: true,
});
