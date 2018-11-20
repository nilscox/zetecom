import React from 'react';
import { Collapse } from 'react-collapse';
import dateformat from 'dateformat';

import MyContext from 'MyContext';
import request from 'Services/request-service';
import { labelCanApprove, labelBorderStyle } from 'Services/label-service';
import { ReactionForm, UserAvatar, Loading } from 'Components';
import ReactionHistory from './ReactionHistory';
import ReactionMessage from './ReactionMessage';
import { classList } from 'utils';

import './Reaction.css';

/**

Reaction props:
- information: Information
- reaction: Reaction
- answerTo: Reaction
- displayAnswers: reaction => boolean
- toggleAnswers: reaction => {}
- onReactionSubmitted: reaction => {}

Reaction state:
- showAnswers: boolean
- showAnswerInput: boolean
- editing: boolean
- edited: Reaction
- historyModalOpen: boolean

*/

class Reaction extends React.Component {

  static contextType = MyContext;

  state = {
    showAnswerInput: false,
    showAnswers: false,
    editing: false,
    edited: null,
    historyModalOpen: false,
  };

  static getDerivedStateFromProps(props) {
    return { showAnswers: props.displayAnswers(props.reaction) };
  }

  getReaction() {
    if (this.state.edited !== null)
      return this.state.edited;
    else
      return this.props.reaction;
  }

  approve(approve) {
    const { information } = this.props;
    const { user } = this.context;
    const reaction = this.getReaction();

    if (reaction.author.nick === user.nick)
      return;

    let url = '/api/information/' + information.slug + '/reaction/' + reaction.slug;

    if ((approve && reaction.didApprove) || (!approve && reaction.didRefute))
      url += '/clearvote';
    else if (approve)
      url += '/approve';
    else
      url += '/refute';

    request(url, {
      method: 'POST',
    }, {
      200: json => this.setState({ edited: json }),
      default: this.context.onError,
    });
  }

  render() {
    const { answerTo } = this.props;
    const { editing } = this.state;
    const reaction = this.getReaction();

    if (editing)
      return this.renderEdition();

    return (
      <div
        id={'reaction-' + reaction.slug}
        className={classList(['reaction', 'border', 'rounded', 'position-relative',
          answerTo ? 'ml-3 border-right-0 border-bottom-0' : 'mb-2',
          'label-border--' + reaction.label,
        ])}
      >

        { this.renderAuthor() }
        { this.renderEditionDate() }
        { this.renderQuote() }

        <ReactionMessage message={this.getReaction().text} />

        { this.renderActions() }
        { this.renderAnswerForm() }
        { this.renderAnswers() }
        { this.renderHistoryModal() }

      </div>
    );
  }

  renderEdition() {
    const { information, answerTo } = this.props;
    const reaction = this.getReaction();

    return (
      <ReactionForm
        information={information}
        reaction={reaction}
        answerTo={answerTo}
        onClose={() => this.setState({ editing: false })}
        onReactionSubmitted={reaction => this.setState({ edited: reaction })}
      />
    );
  }

  renderAuthor() {
    const { author } = this.getReaction();
    const { user } = this.context;

    return (
      <div className="reaction-author d-flex flex-row align-items-center p-2 border-bottom">

        <UserAvatar className="reaction-author-avatar" user={author} />

        <div className="reaction-author-nick ml-2">{ author.nick }</div>

        { user && author.nick === user.nick && (
          <div
            className="reaction-edit ml-1"
            onClick={() => this.setState({ editing: true })}
          >
            (edit)
          </div>
        ) }

      </div>
    );
  }

  renderEditionDate() {
    const reaction = this.getReaction();
    const date = new Date(reaction.date);
    const lastEdit = reaction.lastEdit && new Date(reaction.lastEdit);

    return (
      <div
        className={classList('reaction-edition position-absolute p-2 text-muted', lastEdit && 'cursor-pointer')}
        title={lastEdit && dateformat(lastEdit, '"Édité le" dd/mm/yyyy "à" HH:MM')}
        onClick={() => this.setState({ historyModalOpen: true })}
      >
        { dateformat(date, '"Le" dd/mm/yyyy "à" HH:MM') }
      </div>
    );
  }

  renderQuote() {
    const { quote } = this.getReaction();

    if (!quote)
      return;

    return (
      <div className="reaction-quote py-3 border-bottom">
        { quote }
      </div>
    );
  }

  renderActions() {
    const reaction = this.getReaction();
    const { user } = this.context;

    if (!user)
      return;

    return (
      <div className="reaction-actions my-2">

        { labelCanApprove(reaction.label) && (
          <div className="d-inline">
            <button
              className={classList('btn', 'btn-sm', 'mx-2', 'py-1', 'px-2',
                reaction.didApprove ? 'btn-success' : 'btn-outline-success',
              )}
              disabled={reaction.author.nick === user.nick}
              onClick={() => this.approve(true)}
            >
              J'approuve ({ reaction.approves })
            </button>
            <button
              className={classList('btn', 'btn-sm', 'mx-2', 'py-1', 'px-2',
                reaction.didRefute ? 'btn-danger' : 'btn-outline-danger',
              )}
              disabled={reaction.author.nick === user.nick}
              onClick={() => this.approve(false)}
            >
              Je réfute ({ reaction.refutes })
            </button>
          </div>
        ) }

        { !this.state.showAnswerInput && (
          <button
            className="btn btn-sm btn-outline-info mx-2 py-1 px-2"
            onClick={() => this.setState({ showAnswerInput: true })}
          >
            Répondre
          </button>
        ) }

      </div>
    );
  }

  renderAnswerForm() {
    const { information, onReactionSubmitted } = this.props;
    const { showAnswerInput } = this.state;
    const reaction = this.getReaction();

    if (!showAnswerInput)
      return;

    return (
      <ReactionForm
        information={information}
        answerTo={reaction}
        onClose={() => this.setState({ showAnswerInput: false })}
        onReactionSubmitted={onReactionSubmitted}
      />
    );
  }

  renderAnswers() {
    const { toggleAnswers } = this.props;
    const { showAnswers } = this.state;
    const reaction = this.getReaction();
    const props = Object.assign({}, this.props);

    delete props.reaction;
    delete props.answerTo;

    if (!reaction.answers || !reaction.answers.length)
      return;

    return (
      <div>

        <span
          className="display-answers-btn ml-2"
          onClick={() => toggleAnswers(reaction)}
        >
          { showAnswers ? 'Cacher' : 'Voir'} les réponses
          { showAnswers ? ' ⏶ ' : ' ⏷ ' }
        </span>

        <Collapse isOpened={showAnswers} hasNestedCollapse>
          { reaction.answers.map(r => (
            <Reaction
              key={r.slug}
              reaction={r}
              answerTo={reaction}
              {...props}
            />
          )) }
        </Collapse>

      </div>
    );
  }

  renderHistoryModal() {
    const { information } = this.props;
    const { historyModalOpen } = this.state;
    const reaction = this.getReaction();

    if (!reaction.lastEdit)
      return;

    return (
      <ReactionHistory
        information={information}
        reaction={reaction}
        isModalOpen={historyModalOpen}
        onRequestClose={() => this.setState({ historyModalOpen: false })}
      />
    );
  }

}

export default Reaction;
