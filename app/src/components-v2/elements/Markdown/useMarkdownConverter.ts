import { useEffect, useMemo } from 'react';

import showdown from 'showdown';

import highlight from './extensions/highlight.showdown-extension';
import sup from './extensions/sup.showdown-extension';

import './github-markdown.css';

showdown.extension('sup', sup);
showdown.extension('highlight', highlight);

const useMarkdownConverter = (markdown: string, highlight?: string) => {
  const converter = useMemo(
    () =>
      new showdown.Converter({
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
      }),
    [],
  );

  useEffect(() => {
    converter.setOption('highlight', highlight);
  }, [converter, highlight]);

  return useMemo(() => converter.makeHtml(markdown), [converter, markdown]);
};

export default useMarkdownConverter;
