/** @jsx jsx */
import { useState } from 'react';

import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import Markdown from 'src/components-v2/elements/Markdown/Markdown';
import { spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

import Tabs, { Tab, useTabs } from '../../elements/Tabs/Tabs';
import { CommentContainer } from '../Comment/CommentComponent/CommentComponent';

import CommentFormFooter from './CommentFormFooter/CommentFormFooter';
import CommentFormHeader from './CommentFormHeader/CommentFormHeader';
import CommentTextEdition from './CommentTextEdition/CommentTextEdition';

const StyledTabs = styled(Tabs)`
  margin-top: ${spacing(2)};
`;

type CommentFormProps = {
  className?: string;
  type: 'edition' | 'reply';
  commentId: number;
  author: UserLight;
  initialText?: string;
  placeholder?: string;
  submitting: boolean;
  onSubmit: (text: string) => void;
  onClose: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  className,
  type,
  commentId,
  author,
  initialText = '',
  placeholder,
  submitting,
  onSubmit,
  onClose,
}) => {
  const [currentTab, tabs] = useTabs(['edit', 'preview']);
  const [text, setText] = useState(initialText);

  const tabPanels = {
    edit: (
      <div role="tabpanel" css={{ display: 'flex' }}>
        <CommentTextEdition text={text} placeholder={placeholder} onChange={setText} />
      </div>
    ),

    preview: (
      <div role="tabpanel">
        <Markdown
          markdown={text}
          css={theme => ({
            padding: [theme.spacings[2], theme.spacings[1]].join(' '),
            minHeight: theme.spacings[5],
          })}
        />
      </div>
    ),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <CommentContainer
      as="form"
      role="form"
      className={className}
      data-testid={`comment-${type}-form-${commentId}`}
      onSubmit={handleSubmit}
    >
      <CommentFormHeader type={type} user={author} onClose={onClose} />

      <StyledTabs>
        <Tab {...tabs.edit}>Éditer</Tab>
        <Tab {...tabs.preview}>Aperçu</Tab>
      </StyledTabs>

      {tabPanels[currentTab]}

      <CommentFormFooter submitting={submitting} />
    </CommentContainer>
  );
};

export default CommentForm;
