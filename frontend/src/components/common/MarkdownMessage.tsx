import React, { useMemo } from 'react';
import showdown from 'showdown';

import { useTheme } from 'src/utils/Theme';

import Box from './Box';

type MarkdownMessageProps = {
  markdown: string;
};

const converter = new showdown.Converter({ tables: true });

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ markdown }) => {
  const html = useMemo(() => converter.makeHtml(markdown), [markdown]);
  const { sizes: { medium } } = useTheme();

  return (
    <Box
      p={medium}
      className="markdown-github"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownMessage;
