/** @jsx jsx */
import { useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import Markdown from 'src/components/elements/Markdown/Markdown';
import Tabs, { Tab, useTabs } from 'src/components/elements/Tabs/Tabs';
import useUpdateEffect from 'src/hooks/useUpdateEffect';
import { spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

import { CommentContainer } from '../Comment/CommentComponent/CommentComponent';

import CommentFormFooter from './CommentFormFooter/CommentFormFooter';
import CommentFormHeader from './CommentFormHeader/CommentFormHeader';
import CommentTextEdition from './CommentTextEdition/CommentTextEdition';

const StyledTabs = styled(Tabs)`
  margin-top: ${spacing(2)};
`;

type CommentFormProps = {
  className?: string;
  type: 'root' | 'edition' | 'reply';
  author: UserLight;
  initialText?: string;
  placeholder?: string;
  submitting: boolean;
  onSubmit: (text: string) => void;
  onClose?: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  className,
  type,
  author,
  initialText = '',
  placeholder,
  submitting,
  onSubmit,
  onClose,
}) => {
  const [currentTab, tabs] = useTabs(['edit', 'preview']);
  const [text, setText] = useState(initialText);

  useUpdateEffect(() => {
    if (!submitting) {
      setText('');
    }
  }, [submitting]);

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
      data-testid={`comment-${type}-form`}
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
