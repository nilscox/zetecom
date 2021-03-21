/** @jsx jsx */
import { useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import UserAvatarNick from 'src/components/domain/UserAvatarNick/UserAvatarNick';
import { borderRadius, color, domain, spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

import CommentDate from './CommentDate/CommentDate';
import EditCommentButton from './EditCommentButton/EditCommentButton';
import ReportCommentLink from './ReportCommentLink/ReportCommentLink';

export const CommentHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${color('border')};
  border-top-left-radius: ${borderRadius(2)};
  border-top-right-radius: ${borderRadius(2)};
  padding: ${spacing(0.5)};
  background: ${domain('commentLightBackground')};
`;

const ReportDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-left: auto;
  white-space: nowrap;
`;

type CommentHeaderProps = {
  className?: string;
  author: UserLight;
  edited: boolean;
  date: Date;
  onEdit?: () => void;
  onReport?: () => void;
  onViewHistory?: () => void;
};

const CommentHeader: React.FC<CommentHeaderProps> = ({
  className,
  author,
  edited,
  date,
  onEdit,
  onReport,
  onViewHistory,
  children,
}) => {
  const [reportCommentLinkVisible, setReportCommentLinkVisible] = useState(false);

  return (
    <CommentHeaderContainer className={className}>
      <UserAvatarNick small user={author} />

      {onEdit && <EditCommentButton onClick={onEdit} css={theme => ({ marginLeft: theme.spacings[2] })} />}

      {children}

      <ReportDateContainer
        onMouseOver={() => setReportCommentLinkVisible(true)}
        onMouseOut={() => setReportCommentLinkVisible(false)}
      >
        {onReport && <ReportCommentLink visible={reportCommentLinkVisible} onClick={onReport} />}
        {date && <CommentDate date={date} edited={edited} onClick={onViewHistory} />}
      </ReportDateContainer>
    </CommentHeaderContainer>
  );
};

export default CommentHeader;
