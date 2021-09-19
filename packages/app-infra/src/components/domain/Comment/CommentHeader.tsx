import React, { useState } from 'react';

import styled from '@emotion/styled';
import {
  openEditionForm,
  openHistoryPopup,
  openReportPopup,
  selectCanEdit,
  selectCanReport,
  selectCanViewHistory,
  selectComment,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import IconEdit from '~/components/icons/Edit.svg';

import { AvatarNick } from '~/components/elements/Avatar/Avatar';
import { IconButton } from '~/components/elements/IconButton/IconButton';
import { Text } from '~/components/elements/Text/Text';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import useDateFormat, { DATE_FORMAT_DAY_HOUR } from '~/hooks/useFormatDate';
import { border, color, fontSize, fontWeight, radius, spacing, transition } from '~/theme';

type CommentHeaderProps = {
  commentId: string;
};

export const CommentHeader: React.FC<CommentHeaderProps> = ({ commentId }) => {
  const dispatch = useDispatch();

  const comment = useAppSelector(selectComment, commentId);
  const { author, edited, date } = comment;

  const canEdit = useAppSelector(selectCanEdit, commentId);
  const canReport = useAppSelector(selectCanReport, commentId);
  const canViewHistory = useAppSelector(selectCanViewHistory, commentId);

  return (
    <CommentHeaderContainer>
      <AvatarNick size="small" user={author} />

      {canEdit && (
        <IconButton as={IconEdit} title="Éditer votre message" onClick={() => dispatch(openEditionForm(comment.id))} />
      )}

      <HeaderRight
        edited={edited}
        date={date}
        onViewHistory={canViewHistory ? () => dispatch(openHistoryPopup(commentId)) : undefined}
        onReport={canReport ? () => dispatch(openReportPopup(commentId)) : undefined}
      />
    </CommentHeaderContainer>
  );
};

export const CommentHeaderContainer = styled(Flex)`
  padding: ${spacing(1)};
  align-items: center;
  background-color: ${color('backgroundLight')};
  border-top-left-radius: ${radius()};
  border-top-right-radius: ${radius()};
  border-bottom: ${border('light')};
`;

type HeaderRightProps = {
  date: Date;
  edited: Date | false;
  onViewHistory?: () => void;
  onReport?: () => void;
};

const HeaderRight: React.FC<HeaderRightProps> = ({ date, edited, onViewHistory, onReport }) => {
  const formatDate = useDateFormat(DATE_FORMAT_DAY_HOUR);
  const [over, setOver] = useState(false);

  return (
    <StyledHeaderRight onMouseOver={() => setOver(true)} onMouseOut={() => setOver(false)}>
      {onReport && (
        <ReportLink visible={over} to="#" onClick={onReport}>
          Signaler
        </ReportLink>
      )}
      <CommentDate
        edited={edited !== false}
        role={onViewHistory ? 'link' : undefined}
        title={onViewHistory ? "Voir l'historique d'édition" : undefined}
        onClick={onViewHistory}
      >
        {edited && '* '}
        {formatDate(date)}
      </CommentDate>
    </StyledHeaderRight>
  );
};

const StyledHeaderRight = styled(Flex)`
  flex-direction: row;
  align-self: flex-start;
  margin-left: auto;
`;

const CommentDate = styled(Text)<{ edited: boolean }>`
  color: ${color('textLight')};
  font-size: ${fontSize(0)};
  font-style: ${({ edited }) => (edited ? 'oblique' : undefined)};
  cursor: ${({ edited }) => (edited ? 'pointer' : undefined)};
`;

const ReportLink = styled(Link, { shouldForwardProp: (prop) => prop !== 'visible' })<{ visible: boolean }>`
  color: ${color('error')};
  font-size: ${fontSize(0)};
  font-weight: ${fontWeight('medium')};
  margin-right: ${spacing(3)};
  text-decoration: none;
  transition: ${transition('opacity')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;
