import { useCallback } from 'react';

import showdown from 'showdown';

import highlight from './extensions/highlight.showdown-extension';
import sup from './extensions/sup.showdown-extension';

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

type MarkdownConverter = (markdown: string) => string;

const useMarkdownConverter = (highlight?: string): MarkdownConverter => {
  return useCallback(
    (markdown: string) => {
      converter.setOption('highlight', highlight);

      return converter.makeHtml(markdown);
    },
    [highlight],
  );
};

export default useMarkdownConverter;
