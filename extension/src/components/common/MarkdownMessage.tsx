import React, { useMemo } from 'react';

import showdown from 'showdown';

import { useTheme } from 'src/utils/Theme';

import Box, { BoxProps } from './Box';

type MarkdownMessageProps = BoxProps & {
  markdown: string;
  style?: React.CSSProperties;
};

const converter = new showdown.Converter({ tables: true, simpleLineBreaks: false });

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ markdown, style, ...props }) => {
  const html = useMemo(() => converter.makeHtml(markdown), [markdown]);
  const { sizes: { medium } } = useTheme();

  return (
    <Box
      p={medium}
      className="markdown-github"
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};

export default MarkdownMessage;
