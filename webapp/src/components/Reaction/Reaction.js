import React from 'react';
import { Redirect } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import Linkify from 'react-linkify';
import dateformat from 'dateformat';
import ReactModal from 'react-modal';

import MyContext from 'MyContext';
import request from 'Services/request-service';
import { labelCanApprove, labelBorderStyle } from 'Services/label-service';
import { ReactionForm, UserAvatar, Loading } from 'Components';
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
 - edit: boolean

 */

ReactModal.setAppElement('#app');

class Reaction extends React.Component {

  static contextType = MyContext;

  state = {
    showAnswerInput: false,
    showAnswers: false,
    editing: false,
    edited: null,
    history: null,
    notFound: false,
    showModal: false,
    loading: false,
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

  render() {
    const { answerTo } = this.props;
    const { editing, notFound } = this.state;
    const reaction = this.getReaction();

    if (notFound)
      return <Redirect to={`information/${information.slug}`} />;

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
        { this.renderMessage() }
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

    return (
      <div
        className="reaction-edition position-absolute p-2 text-muted"
        onClick={() => this.handleOpenModal()}
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

  renderMessage() {
    const reaction = this.getReaction();

    return (
      <div className="reaction-message p-2">
        { reaction.text.split('\n\n').map((p, n) => (
          <p key={n}>
            { p.split('\n').map((l, n) => (
              <span key={n}>
                <Linkify properties={{ target: '_blank' }}>{ l }</Linkify>
                <br />
              </span>
            )) }
          </p>
        )) }
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
            <button className="btn btn-sm btn-outline-success mx-2 py-1 px-2">J'approuve</button>
            <button className="btn btn-sm btn-outline-danger mx-2 py-1 px-2">Je réfute</button>
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
    return (
      <ReactModal
        isOpen={this.state.showModal}
        onRequestClose={() => this.handleCloseModal()}
        onAfterOpen={() => this.handleAfterOpenFunc()}
      >
        { this.state.loading && <Loading /> }
        { this.state.history && this.state.history.map(m => this.renderHistory(m)) }

      </ReactModal>
    )
  }

  renderHistory(message) {
    const date = new Date(message.date);

    return (
      <div key={message.date}>

        <div className="reaction-history-date-wrapper">
          <p className="p-2 text-muted">{dateformat(date, '"Le" dd/mm/yyyy "à" HH:MM')}</p>
          <div className="line-wrapper">
            <div className="line"></div>
          </div>
        </div>

        <p>{message.text}</p>
      </div>
    )
  }

  async handleOpenModal() {
    this.setState({ showModal: true, loading: true });

    if (!this.state.history || this.state.edited !== null) {
      await this.fetchHistory();
    }

    if (this.state.history && this.state.history.length < 1) {
      this.setState({ loading: false });
      this.handleCloseModal();
    }
  }

  handleAfterOpenFunc() {
    this.setState({ loading: false });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  async fetchHistory() {
    const { information, reaction } = this.props;

    await request('/api/information/' + information.slug + '/reaction/' + reaction.slug, {}, {
      200: json => this.setState({ history: json.history }),
      404: () => this.setState({ notFound: true }),
      default: this.context.onError,
    });
  }
}

export default Reaction;
