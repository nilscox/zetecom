import React, { useMemo } from 'react';
import showdown from 'showdown';

import { useTheme } from 'src/utils/Theme';

import Box from './Box';

type MarkdownMessageProps = {
  markdown: string;
  style?: React.CSSProperties;
};

const converter = new showdown.Converter({ tables: true });

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ markdown, style }) => {
  const html = useMemo(() => converter.makeHtml(markdown), [markdown]);
  const { sizes: { medium } } = useTheme();

  return (
    <Box
      p={medium}
      className="markdown-github"
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownMessage;
