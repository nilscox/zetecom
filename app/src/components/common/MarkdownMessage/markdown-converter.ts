import showdown from 'showdown';

import highlight from './highlight.showdown-extension';
import sup from './sup.showdown-extension';

showdown.extension('sup', sup);
showdown.extension('highlight', highlight);

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
  extensions: ['sup', 'highlight'],
});

export default converter;
