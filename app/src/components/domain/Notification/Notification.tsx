import React from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';

import useDateFormat from 'src/hooks/useDateFormat';
import { fontSize, size, transition } from 'src/theme';

import MarkAsSeen from './MarkAsSeen/MarkAsSeen';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  transition: ${transition('fast', 'opacity')};

  &.seen {
    opacity: 0.5;
  }
`;

const Date = styled.div`
  min-width: ${size('small')};
  flex: 1;
  font-size: ${fontSize('large')};
`;

const Content = styled.div`
  flex: 3;
`;

const Title = styled.div`
  font-size: ${fontSize('large')};
`;

const Text = styled.div``;

type NotificationProps = {
  date: Date;
  title: React.ReactNode;
  text: React.ReactNode;
  seen: boolean;
  markAsSeen?: () => void;
};

const Notification: React.FC<NotificationProps> = ({ date, title, text, seen, markAsSeen }) => {
  const formatDate = useDateFormat('DD MM YYYY - hh:mm', false);

  return (
    <Container className={clsx(seen && 'seen')}>
      <Date>{formatDate(date)}</Date>
      <Content>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </Content>
      <MarkAsSeen onClick={markAsSeen} />
    </Container>
  );
};

export default Notification;
