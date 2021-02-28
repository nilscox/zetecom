import React from 'react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useMutation } from 'react-query';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';
import CommentsAreaClosed from 'src/extension/Integration/CommentsAreaClosed/CommentsAreaClosed';
import useIFrameMessages from 'src/hooks/use-iframe-messages';
import useQueryString from 'src/hooks/use-query-string';
import { color, spacing } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

const requestCommentsArea = async (identifier: string, informationUrl: string) => {
  await axios.post('/api/comments-area/request', { identifier, informationUrl });
};

const Container = styled.div`
  border: 1px solid ${color('border')};
  padding: ${spacing(1)};
`;

const Integration: React.FC = () => {
  const { identifier, pageUrl: informationUrl } = useQueryString();
  const { mutate, isSuccess: requested } = useMutation(() =>
    requestCommentsArea(identifier as string, informationUrl as string),
  );

  const [sendMessage] = useIFrameMessages();

  const handleCommentsAreaLoaded = (commentsArea: CommentsArea) => {
    sendMessage({ type: 'INTEGRATION_LOADED', comments: commentsArea.commentsCount });
  };

  return (
    <Container>
      <HeaderLogo small link={false} />
      <CommentsAreaContainer
        commentsAreaIdentifier={identifier as string}
        notFoundFallback={<CommentsAreaClosed requested={requested} onRequest={mutate} />}
        onCommentsAreaLoaded={handleCommentsAreaLoaded}
      />
    </Container>
  );
};

export default Integration;
