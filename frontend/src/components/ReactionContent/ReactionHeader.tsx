import React from 'react';
import moment from 'moment';

import { classList } from '../../utils/classList';
import { Reaction } from '../../types/Reaction';

type ReactionHeaderProps = {
  reaction: Reaction;
  onOpenHistory: () => void;
};

const ReactionHeader = (props: ReactionHeaderProps) => {
  const { reaction } = props;
  const { author } = reaction;

  return (
    <div className="reaction-header">

      <div className="reaction-author-avatar">
        <img src={author.avatar || '/assets/images/default-avatar.png'} />
      </div>

      <div className="reaction-author-nick">{author.nick}</div>

      <div
        className={classList('reaction-date', reaction.edited && 'reaction-date-edited')}
        title={reaction.edited ? moment(reaction.edited).format('[Edité le] Do MMMM YYYY [à] hh:mm') : undefined}
        onClick={() => reaction.edited && props.onOpenHistory()}
      >
        { reaction.edited && '* ' }
        { moment(reaction.date).format('[Le] Do MMMM YYYY [à] hh:mm') }
      </div>

    </div>
  );
};

export { ReactionHeader };
