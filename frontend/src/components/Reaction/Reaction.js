import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import dateformat from 'dateformat';

import { classList } from 'utils';

import { User, Reaction as ReactionType } from 'Types';
import { UserConsumer } from 'Contexts';
import { ReactionForm } from 'Components';

import ReactionHeader from './ReactionHeader';
import ReactionQuote from './ReactionQuote';
import ReactionMessage from './ReactionMessage';
import ReactionActions from './ReactionActions';
import ReactionActionsNoLogin from './ReactionActions.nologin';
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

        <UserConsumer>
        { user => user ? (
          <ReactionActions
            {...reaction}
            showReplies={showReplies}
            onShowReplies={() => this.toggleShowReplies()}
            isReplying={showReplyForm}
            onReply={() => this.showReplyForm(true)}
          />
        ) : (
          <ReactionActionsNoLogin
            {...reaction}
            showReplies={showReplies}
            onShowReplies={() => this.toggleShowReplies()}
          />
        ) }
        </UserConsumer>

        <Collapse isOpened={showReplyForm}>
          <ReactionForm
            replyTo={reaction}
            onReactionSubmitted={this.props.onReactionSubmitted}
            onClose={() => this.showReplyForm(false)}
          />
        </Collapse>

        <Collapse isOpened={showReplies}>
          <ReactionReplies replies={reaction.replies} />
        </Collapse>

      </div>
    );
  }

}

Reaction.propTypes = {
  reaction: PropTypes.instanceOf(ReactionType).isRequired,
  onReactionSubmitted: PropTypes.func.isRequired,
};

export default Reaction;
