import React from 'react';

import clsx from 'clsx';

import useMarkdownConverter from './useMarkdownConverter';

type MarkdownProps = {
  className?: string;
  markdown: string;
  highlight?: string;
};

const Markdown: React.FC<MarkdownProps> = ({ className, markdown, highlight }) => {
  const html = useMarkdownConverter(markdown, highlight);

  return <div className={clsx('markdown-github', className)} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
