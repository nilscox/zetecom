import React from 'react';
import moment from 'moment';

import { Reaction } from '../../types/Reaction';

type ReactionHeaderProps = {
  reaction: Reaction;
};

const ReactionHeader = (props: ReactionHeaderProps) => {
  const { reaction } = props;
  const { avatar, nick } = reaction.author;

  return (
    <div className="reaction-header">
      <div className="reaction-author-avatar">
        <img src={avatar ? avatar.src : '/assets/images/default-avatar.png'} />
      </div>
      <div className="reaction-author-nick">{nick}</div>
      <div className="reaction-date">
        { reaction.edited
          ? moment(reaction.edited).format('[Edité le] Do MMMM YYYY [à] hh:mm')
          : moment(reaction.date).format('[Le] Do MMMM YYYY [à] hh:mm')
        }
      </div>
    </div>
  );
};

export { ReactionHeader };
