/** @jsx jsx */
import { useState } from 'react';

import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import Markdown from 'src/components-v2/elements/Markdown/Markdown';
import { spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

import Tabs, { Tab, useTabs } from '../../elements/Tabs/Tabs';
import { CommentContainer } from '../Comment/Comment';
import CommentHeader from '../Comment/CommentHeader/CommentHeader';

import CommentFormFooter from './CommentFormFooter/CommentFormFooter';
import CommentTextEdition from './CommentTextEdition/CommentTextEdition';

const StyledTabs = styled(Tabs)`
  margin-top: ${spacing(2)};
`;

type CommentFormProps = {
  author: UserLight;
  initialText?: string;
  placedolder?: string;
  submitting: boolean;
  onSubmit: (text: string) => void;
};

const CommentForm: React.FC<CommentFormProps> = ({ author, initialText = '', placedolder, submitting, onSubmit }) => {
  const [currentTab, tabs] = useTabs(['edit', 'preview']);
  const [text, setText] = useState(initialText);

  const tabPanels = {
    edit: (
      <div role="tabpanel" css={{ display: 'flex' }}>
        <CommentTextEdition text={text} placedolder={placedolder} onChange={setText} />
      </div>
    ),

    preview: (
      <div role="tabpanel">
        <Markdown
          markdown={text}
          css={theme =>
            css`
              padding: ${theme.spacings[2]} ${theme.spacings[1]};
              min-height: ${theme.spacings[5]};
            `
          }
        />
      </div>
    ),
  };

  return (
    <CommentContainer>
      <CommentHeader user={author} />

      <StyledTabs>
        <Tab {...tabs.edit}>Éditer</Tab>
        <Tab {...tabs.preview}>Aperçu</Tab>
      </StyledTabs>

      {tabPanels[currentTab]}

      <CommentFormFooter submitting={submitting} onSubmit={() => onSubmit(text)} />
    </CommentContainer>
  );
};

export default CommentForm;
