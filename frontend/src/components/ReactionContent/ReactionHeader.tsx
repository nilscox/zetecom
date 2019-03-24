import React from 'react';
import moment from 'moment';

import { Reaction } from '../../types/Reaction';

type ReactionHeaderProps = {
  reaction: Reaction;
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
