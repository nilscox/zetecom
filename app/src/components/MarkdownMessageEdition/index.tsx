import React, { useEffect, useRef, useState } from 'react';

import Flex from 'src/components/Flex';
import MarkdownMessage from 'src/components/MarkdownMessage';
import { useTheme } from 'src/theme/Theme';

import Tabs from './Tabs';

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
  return <MarkdownMessage className="markdown-preview" markdown={message} minHeight={42} />;
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

      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      { {
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
      }[currentTab] }

    </Flex>
  );
};

export default MarkdownMessageEdition;
