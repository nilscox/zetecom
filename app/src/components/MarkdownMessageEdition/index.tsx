import React, { useEffect, useRef, useState } from 'react';

import { Grid, useTheme } from '@material-ui/core';

import MarkdownMessage from 'src/components/MarkdownMessage';

import Tabs from './Tabs';

type MarkdownMessageFieldProps = {
  message: string;
  placeholder?: string;
  setMessage: (message: string) => void;
};

const MarkdownMessageField: React.FC<MarkdownMessageFieldProps> = ({ message, placeholder, setMessage }) => {
  const rows = 4;
  const ref = useRef<HTMLTextAreaElement>(null);

  const theme = useTheme();

  useEffect(() => {
    if (ref.current) {
      ref.current.rows = ref.current.scrollHeight / 16;
    }
  }, []);

  useEffect(() => {
    if (ref.current && message.length === 0) {
      ref.current.style.height = `${rows * 16}px`;
    }
  }, [message]);

  useEffect(() => {
    if (!message) {
      return;
    }

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
      style={{ border: 'none', padding: theme.spacing(2), outline: 'none', resize: 'vertical' }}
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
  const [currentTab, setCurrentTab] = useState<'edit' | 'preview'>('edit');
  const theme = useTheme();

  return (
    <Grid container direction="column" style={{ marginTop: theme.spacing(2) }}>

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

    </Grid>
  );
};

export default MarkdownMessageEdition;
