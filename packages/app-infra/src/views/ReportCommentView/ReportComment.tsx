import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Comment, reportComment, selectIsCommentReported, selectIsReportingComment } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { Button } from '~/components/elements/Button/Button';
import { Input } from '~/components/elements/Input/Input';
import { WebsiteLink } from '~/components/elements/Link/Link';
import { Markdown } from '~/components/elements/Markdown/Markdown';
import { Text } from '~/components/elements/Text/Text';
import { Flex } from '~/components/layout/Flex/Flex';
import { Nested } from '~/components/layout/Nested/Nested';
import { useAppSelector } from '~/hooks/useAppSelector';

type ReportCommentProps = {
  comment: Comment;
};

export const ReportComment: React.FC<ReportCommentProps> = ({ comment }) => {
  const dispatch = useDispatch();

  const isReporting = useAppSelector(selectIsReportingComment);
  const isReported = useAppSelector(selectIsCommentReported);

  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(reportComment(comment.id, message || undefined));
  };

  if (isReported) {
    return <ReportSuccess />;
  }

  return (
    <>
      <Text as="h1" fontSize={4} fontWeight="bold" paddingY={4}>
        Signaler le commentaire de {comment.author.nick}
      </Text>

      <Text color="warning" fontWeight="medium">
        Vous êtes sur le point de signaler un commentaire.
      </Text>

      <Text as="p" color="warning" fontSize={1}>
        Il est important de signaler les commentaires qui dérogent à{' '}
        <WebsiteLink href="/charte.html">la charte</WebsiteLink> : cela en informera les modérateurs qui pourront
        entreprendre une action en fonction de la situation.
      </Text>

      <Text as="p" color="warning" fontSize={1}>
        Cependant, être en désaccord avec un message n'est pas un motif valable pour la signaler, et abuser de la
        fonction de signalement de manière répété et sans raison valable peut entraîner une suspension de votre compte.
      </Text>

      <Nested marginY={6}>
        <Markdown paddingLeft={3} markdown={comment.text} />
      </Nested>

      <form onSubmit={handleSubmit}>
        <Input
          outlined
          fullWidth
          as="textarea"
          placeholder="Précisez en quelques mots le motif du signalement si nécessaire"
          value={message}
          onTextChange={setMessage}
        />

        <Flex direction="row" justifyContent="center">
          <Button type="submit" loading={isReporting} marginY={5}>
            Signaler
          </Button>
        </Flex>
      </form>
    </>
  );
};

const ReportSuccess: React.FC = () => (
  <StyledReportSuccess justifyContent="center" alignItems="center">
    <Text fontWeight="medium">Le commentaire a bien été signalé, merci pour votre contribution ! 💪</Text>
  </StyledReportSuccess>
);

const StyledReportSuccess = styled(Flex)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
