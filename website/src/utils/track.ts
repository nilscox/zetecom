import ReactGA from 'react-ga';

export const trackOpenExtensionDownloadLink = (browser: 'chrome' | 'firefox', staging?: boolean) => {
  ReactGA.event({
    category: 'WebsiteLink',
    action: `OpenDownload${{ chrome: 'Chrome', firefox: 'Firefox' }[browser]}Extension${staging ? 'Staging' : ''}Link`,
  });
};

export const trackOpenRepositoryLink = (from: 'faq' | 'footer') => {
  ReactGA.event({
    category: 'WebsiteLink',
    action: 'OpenRepositoryLink',
    label: `Open repository link from ${from}`,
  });
};

export const trackOpenFeatureUpvoteLink = () => {
  ReactGA.event({
    category: 'WebsiteLink',
    action: 'OpenFeatureUpvoteLink',
  });
};
