import React, { useContext } from 'react';
import moment from 'moment';

import { Reaction } from 'src/types/Reaction';
import { classList } from 'src/utils/classList';
import UserContext from 'src/utils/UserContext';

import { ExpandType } from './ReactionContent';

type ReactionHeaderProps = {
  reaction: Reaction;
  expand: ExpandType;
  onOpenHistory: () => void;
  onEditReaction: () => void;
  onReportReaction: () => void;
  setExpand: (expand: ExpandType) => void;
};

const ReactionHeader = (props: ReactionHeaderProps) => {
  const { reaction, expand, setExpand } = props;
  const { author } = reaction;
  const { user } = useContext(UserContext);

  return (
    <div className="reaction-header">

      <div className="reaction-author-avatar">
        <img src={author.getAvatarUrl()} />
      </div>

      <div className="reaction-author-nick">
        { author.nick }
        { user && author.id === user.id && (
          <div className="reaction-edit" onClick={props.onEditReaction}>(éditer)</div>
        ) }
      </div>

      <div className="reaction-header-top-right-wrapper">

        { user && (
          <div className="report" onClick={props.onReportReaction}>
            Signaler
          </div>
        ) }

        <div
          className={classList('reaction-date', reaction.edited && 'reaction-date-edited')}
          title={reaction.edited ? moment(reaction.edited).format('[Edité le] Do MMMM YYYY [à] hh:mm') : undefined}
          onClick={() => reaction.edited && props.onOpenHistory()}
        >
          { reaction.edited && '* ' }
          { moment(reaction.date).format('[Le] Do MMMM YYYY [à] hh:mm') }
        </div>

      </div>

      { expand === 'fold'
        ? (
          <div className="toggle-expand" onClick={() => setExpand('full')}>
            Déplier <span className="toggle-expand-arrow">▸</span>
          </div>
        ) : (
          <div className="toggle-expand" onClick={() => setExpand('fold')}>
            Replier <span className="toggle-expand-arrow">▾</span>
          </div>
        )
      }

    </div>
  );
};

export { ReactionHeader };