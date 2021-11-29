import styled from '@emotion/styled';
import clsx from 'clsx';

import { Box, BoxProps } from '~/components/layout/Box/Box';
import { domain } from '~/theme';

import './github-markdown.css';

import useMarkdownConverter from './useMarkdownConverter';

type MarkdownProps = BoxProps & {
  className?: string;
  markdown: string;
  highlight?: string;
};

export const Markdown: React.FC<MarkdownProps> = ({ className, markdown, highlight, ...props }) => {
  const convert = useMarkdownConverter(highlight);
  const html = convert(markdown);

  return (
    <Container className={clsx('markdown-github', className)} dangerouslySetInnerHTML={{ __html: html }} {...props} />
  );
};

const Container = styled(Box)`
  // avoid long text (like urls) to overflow
  word-break: break-word;

  &.markdown-github {
    color: ${domain('comment', 'textColor')};
  }
`;
