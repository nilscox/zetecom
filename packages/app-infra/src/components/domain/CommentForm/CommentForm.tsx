import React, { useState } from 'react';

import styled from '@emotion/styled';
import { selectAuthenticatedUser } from '@zetecom/app-core';
import { useSelector } from 'react-redux';

import IconClose from '~/components/icons/Close.svg';

import { AvatarNick } from '~/components/elements/Avatar/Avatar';
import { Button } from '~/components/elements/Button/Button';
import { IconButton } from '~/components/elements/IconButton/IconButton';
import { Markdown } from '~/components/elements/Markdown/Markdown';
import { Tab, TabPanel, Tabs } from '~/components/elements/Tabs/Tabs';
import { Box } from '~/components/layout/Box/Box';
import useUpdateEffect from '~/hooks/useUpdateEffect';
import { color, spacing } from '~/theme';

import { CommentContainer, CommentFooterContainer, CommentHeaderContainer } from '../Comment/Comment';

export type CommentFormProps = {
  placeholder: string;
  initialValue?: string;
  isLoading: boolean;
  onSubmit: (text: string) => void;
  closeButtonTitle?: string;
  onClose?: () => void;
};

export const CommentForm: React.FC<CommentFormProps> = ({
  placeholder,
  initialValue,
  isLoading,
  onSubmit,
  closeButtonTitle,
  onClose,
}) => {
  const currentUser = useSelector(selectAuthenticatedUser);

  const [text, setText] = useState(initialValue ?? '');

  useUpdateEffect(() => {
    if (!isLoading) {
      setText('');
    }
  }, [isLoading]);

  if (!currentUser) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <CommentContainer as="form" onSubmit={handleSubmit}>
      <CommentHeaderContainer>
        <AvatarNick size="small" user={currentUser} />

        {onClose && (
          <HeaderRight>
            <IconButton as={IconClose} marginX={0} title={closeButtonTitle} onClick={onClose} />
          </HeaderRight>
        )}
      </CommentHeaderContainer>

      <CommentEdition text={text} setText={setText} disabled={isLoading} placeholder={placeholder} />

      <CommentFooterContainer>
        <Button type="submit" marginLeft="auto" loading={isLoading} disabled={text === ''}>
          Envoyer
        </Button>
      </CommentFooterContainer>
    </CommentContainer>
  );
};

export const HeaderRight = styled(Box)`
  align-self: flex-start;
  margin-left: auto;
`;

type CommentEditionProps = {
  text: string;
  setText: (text: string) => void;
  disabled: boolean;
  placeholder: string;
};

const CommentEdition: React.FC<CommentEditionProps> = ({ text, setText, disabled, placeholder }) => {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');

  return (
    <>
      <Tabs>
        <Tab active={tab === 'edit'} onClick={() => setTab('edit')}>
          Éditer
        </Tab>

        <Tab active={tab === 'preview'} onClick={() => setTab('preview')}>
          Aperçu
        </Tab>
      </Tabs>

      {tab === 'edit' && (
        <TabPanel>
          <TextArea
            value={text}
            disabled={disabled}
            rows={4}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
          />
        </TabPanel>
      )}

      {tab === 'preview' && (
        <TabPanel>
          <StyledMarkdown markdown={text} padding={2} />
        </TabPanel>
      )}
    </>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  display: block;
  padding: ${spacing(3, 2)};
  box-sizing: border-box;
  resize: vertical;
  font-family: monospace;

  &:disabled {
    background: transparent;
    color: ${color('textDisabled')};
  }
`;

const StyledMarkdown = styled(Markdown)`
  min-height: ${spacing(5)};
`;
