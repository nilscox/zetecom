import React from 'react';
import { Collapse } from 'react-collapse';
import dateformat from 'dateformat';

import { classList } from 'utils';

import { User } from 'Types';
import { ReactionForm } from 'Components';

import ReactionHeader from './ReactionHeader';
import ReactionQuote from './ReactionQuote';
import ReactionMessage from './ReactionMessage';
import ReactionActions from './ReactionActions';
import ReactionReplies from './ReactionReplies';

import './Reaction.css';

class Reaction extends React.Component {

  state = {
    showReplies: false,
    showReplyForm: false,
  };

  toggleShowReplies() {
    if (this.props.reaction.repliesCount > 0)
      this.setState({ showReplies: !this.state.showReplies });
  }

  showReplyForm(value) {
    this.setState({ showReplyForm: value });
  }

  render() {
    const { reaction } = this.props;
    const { showReplies, showReplyForm } = this.state;

    return (
      <div
        id={'reaction-' + reaction.slug}
        className="reaction border"
      >

        <ReactionHeader
          date={reaction.date}
          edited={reaction.edited}
          author={reaction.author}
        />

        <ReactionQuote quote={reaction.quote} />

        <ReactionMessage>
          { reaction.text }
        </ReactionMessage>

        <ReactionActions
          {...reaction}
          showReplies={showReplies}
          onShowReplies={() => this.toggleShowReplies()}
          onReply={() => this.showReplyForm(true)}
        />

        <Collapse isOpened={showReplyForm}>
          <ReactionForm author={new User({ nick: 'json does' })} replyTo={reaction} onClose={() => this.showReplyForm(false)} />
        </Collapse>

        <Collapse isOpened={showReplies}>
          <ReactionReplies replies={reaction.replies} />
        </Collapse>

      </div>
    );
  }

}

export default Reaction;
