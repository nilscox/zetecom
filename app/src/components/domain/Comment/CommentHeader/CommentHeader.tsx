/** @jsx jsx */
import { useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import UserAvatarNick from 'src/components/domain/UserAvatarNick/UserAvatarNick';
import Icon from 'src/components/elements/Icon/Icon';
import IconButton from 'src/components/elements/IconButton/IconButton';
import { borderRadius, color, domain, spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

import CommentDate from './CommentDate/CommentDate';
import EditCommentButton from './EditCommentButton/EditCommentButton';
import Pin from './pin.svg';
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

const PinButton = styled(IconButton)`
  margin-left: ${spacing(2)};
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  isPin?: boolean;
  author: UserLight;
  edited: boolean;
  date: Date;
  onEdit?: () => void;
  onReport?: () => void;
  onViewHistory?: () => void;
  onPin?: () => void;
};

const CommentHeader: React.FC<CommentHeaderProps> = ({
  className,
  isPin,
  author,
  edited,
  date,
  onEdit,
  onReport,
  onViewHistory,
  onPin,
  children,
}) => {
  const [hover, setHover] = useState(false);
  const [reportCommentLinkVisible, setReportCommentLinkVisible] = useState(false);

  return (
    <CommentHeaderContainer
      className={className}
      onClick={onPin}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <UserAvatarNick small user={author} />

      {onEdit && <EditCommentButton onClick={onEdit} css={(theme) => ({ marginLeft: theme.spacings[2] })} />}

      {(isPin || onPin) && (
        <PinButton title={isPin ? 'Désépingler' : 'Épingler'} onClick={onPin}>
          <Icon
            as={Pin}
            css={(theme) => ({
              width: 16,
              height: 16,
              transform: 'rotate(35deg)',
              opacity: isPin || hover ? 1 : 0,
              transition: 'opacity 125ms ease-in-out',
              color: theme.colors[isPin ? 'primary' : 'secondary'],
            })}
          />
        </PinButton>
      )}

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
