import React, { useMemo } from 'react';
import showdown from 'showdown';

import { useTheme } from 'src/utils/Theme';

import Box from './Box';

type MessageBodyProps = {
  markdown: string,
};

const converter = new showdown.Converter({ tables: true });

const MessageBody: React.FC<MessageBodyProps> = ({ markdown }) => {
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

export default MessageBody;
