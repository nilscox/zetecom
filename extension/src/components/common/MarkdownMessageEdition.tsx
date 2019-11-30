import React, { useState, useRef, useEffect } from 'react';

import { useTheme } from 'src/utils/Theme';
import Button from 'src/components/common/Button';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import MarkdownMessage from 'src/components/common/MarkdownMessage';

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
  const { sizes: { big } } = useTheme();
  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (ref.current)
      ref.current.rows = ref.current.scrollHeight / 16;
  }, [ref.current]);

  return (
    <textarea
      ref={ref}
      style={{ border: 'none', padding: big, outline: 'none', resize: 'vertical' }}
      placeholder={placeholder}
      rows={4}
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
              setMessage={setMessage}
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
