import React, { useMemo } from 'react';

import Box, { BoxProps } from 'src/components/common/Box';
import { useTheme } from 'src/utils/Theme';

import converter from './markdown-converter';

type MarkdownMessageProps = BoxProps & {
  markdown: string;
  highlight?: string;
  style?: React.CSSProperties;
};

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ markdown, highlight, style, ...props }) => {
  converter.setOption('highlight', highlight);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const html = useMemo(() => converter.makeHtml(markdown), [markdown, highlight]);
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
