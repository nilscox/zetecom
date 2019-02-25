import * as React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import { User } from 'Types';
import { UserAvatar } from 'Components';

const ReactionHeader = ({ author, date, edited }) => (
  <div className="reaction-header p-2 d-flex align-items-center border-bottom">

    <UserAvatar
      className="author-avatar mr-2"
      user={author}
    />

    <div className="author-nick font-weight-bold">
      { author.nick }
    </div>

    <div className="flex-grow-1" />

    { date && (
      <div
        className="reaction-date align-self-start text-muted"
        title={edited ? dateformat(edited, '"Édité Le" dd/mm/yyyy "à" HH:MM') : null}
      >
        { dateformat(date, '"Le" dd/mm/yyyy "à" HH:MM') }
      </div>
    ) }

  </div>
);

ReactionHeader.propTypes = {
  author: PropTypes.instanceOf(User).isRequired,
  date: PropTypes.instanceOf(Date),
  edited: PropTypes.instanceOf(Date),
};

export default ReactionHeader;
