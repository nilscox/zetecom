import React, { useMemo } from 'react';

import clsx from 'clsx';

import converter from './markdown-converter';

import { Box, Typography } from '@material-ui/core';

type MarkdownMessageProps = {
  markdown: string;
  highlight?: string;
  minHeight?: number;
  className?: string;
};

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ markdown, highlight, minHeight, className }) => {
  converter.setOption('highlight', highlight);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const html = useMemo(() => converter.makeHtml(markdown), [markdown, highlight]);

  return (
    <Box padding={1} minHeight={minHeight}>
      <Typography className={clsx('markdown-github', className)} dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  );
};

export default MarkdownMessage;
