import showdown from 'showdown';

import sup from './sup.showdown-extension';

showdown.extension('sup', sup);

const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  literalMidWordUnderscores: true,
  literalMidWordAsterisks: true,
  strikethrough: true,
  tables: true,
  disableForced4SpacesIndentedSublists: true,
  simpleLineBreaks: true,
  openLinksInNewWindow: true,
  extensions: ['sup'],
});

export default converter;
