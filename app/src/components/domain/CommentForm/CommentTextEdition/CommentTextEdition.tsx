import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { font, spacing, textColor } from 'src/theme';

const useRows = (ref: React.RefObject<HTMLElement>) => {
  const [rows, setRows] = useState(3);

  useEffect(() => {
    if (ref.current) {
      const lineHeight = Number(getComputedStyle(ref.current).lineHeight.replace('px', ''));
      const scrollHeight = ref.current.scrollHeight;

      setRows(~~(scrollHeight / lineHeight));
    }
  }, [ref]);

  return rows;
};

const useAskBeforeExit = (text: string) => {
  useEffect(() => {
    if (!text) {
      return;
    }

    const listener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', listener);

    return () => window.removeEventListener('beforeunload', listener);
  }, [text]);
};

const StyledTextArea = styled.textarea`
  margin: 0;
  padding: ${spacing(2, 1)};
  font-family: ${font('monospace')};
  line-height: 1.3;
  border: none;
  color: ${textColor('default')};
  width: 100%;
  resize: vertical;
`;

type CommentTextEditionProps = {
  text: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

const CommentTextEdition: React.FC<CommentTextEditionProps> = ({ text, placeholder, onChange }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const rows = useRows(ref);

  useAskBeforeExit(text);

  return (
    <StyledTextArea
      ref={ref}
      value={text}
      placeholder={placeholder}
      rows={rows}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default CommentTextEdition;
