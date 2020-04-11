import React, { useEffect, useRef, useState } from 'react';

import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import Flex from 'src/components/common/Flex';
import MarkdownMessage from 'src/components/common/MarkdownMessage';
import { useTheme } from 'src/utils/Theme';

type TabProps = {
  active: boolean;
  children: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ active, children }) => {
  return (
    <Box
      px={10}
      py={2}
      style={{
        border: '1px solid #CCC',
        borderBottom: active ? 'none' : '1px solid #CCC',
      }}
    >
      { children }
    </Box>
  );
};

const TabSeparator = () => {
  const { sizes: { big } } = useTheme();

  return (
    <Box style={{ width: big, borderBottom: '1px solid #CCC' }} />
  );
};

const TabFiller = () => (
  <Flex style={{ flex: 1, borderBottom: '1px solid #CCC' }} />
);

type MarkdownMessageFieldProps = {
  message: string;
  placeholder?: string;
  setMessage: (message: string) => void;
};

const MarkdownMessageField: React.FC<MarkdownMessageFieldProps> = ({ message, placeholder, setMessage }) => {
  const rows = 4;
  const { sizes: { big } } = useTheme();
  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    ref.current.rows = ref.current.scrollHeight / 16;
  }, []);

  useEffect(() => {
    if (message.length === 0)
      ref.current.style.height = `${rows * 16}px`;
  }, [message]);

  useEffect(() => {
    if (!message)
      return;

    const listener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', listener);

    return () => window.removeEventListener('beforeunload', listener);
  }, [message]);

  return (
    <textarea
      ref={ref}
      style={{ border: 'none', padding: big, outline: 'none', resize: 'vertical' }}
      placeholder={placeholder}
      rows={rows}
      value={message}
      onChange={e => setMessage(e.target.value)}
    />
  );
};

type MarkdownMessagePreviewProps = {
  message: string;
};

const MarkdownMessagePreview: React.FC<MarkdownMessagePreviewProps> = ({ message }) => {
  return <MarkdownMessage className="markdown-github markdown-preview" style={{ minHeight: 42 }} markdown={message} />;
};

const formatMarkdownNewline = (markdown: string) => {
  return markdown.replace('\n', '  \n').replace('  \n\n', '\n\n');
};

type MarkdownMessageEditionProps = {
  message: string;
  placeholder?: string;
  setMessage: (message: string) => void;
};

const MarkdownMessageEdition: React.FC<MarkdownMessageEditionProps> = ({ message, placeholder, setMessage }) => {
  const { sizes: { medium } } = useTheme();
  const [currentTab, setCurrentTab] = useState<'edit' | 'preview'>('edit');

  return (
    <Flex flexDirection="column" mt={medium}>

      <Flex flexDirection="row">
        <TabSeparator />
        <Tab active={currentTab === 'edit'}>
          <Button size="small" onClick={() => setCurrentTab('edit')}>Editer</Button>
        </Tab>
        <TabSeparator />
        <Tab active={currentTab === 'preview'}>
          <Button size="small" onClick={() => setCurrentTab('preview')}>Aperçu</Button>
        </Tab>
        <TabFiller />
      </Flex>

      {
        {
          edit: (
            <MarkdownMessageField
              message={message}
              placeholder={placeholder}
              setMessage={message => setMessage(formatMarkdownNewline(message))}
            />
          ),
          preview: (
            <MarkdownMessagePreview message={message} />
          ),
        }[currentTab]
      }

    </Flex>
  );
};

export default MarkdownMessageEdition;
