import React from 'react';
import { Collapse } from 'react-collapse';
import dateformat from 'dateformat';
import ReactionForm from '../ReactionForm';
import MyContext from '../../MyContext';
import { labelCanApprove, labelBorderStyle } from '../../services/label-service';
import { classList } from '../../utils';
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

*/

class Reaction extends React.Component {

  static contextType = MyContext;

  state = {
    showAnswerInput: false,
    showAnswers: false,
  };

  static getDerivedStateFromProps(props) {
    return { showAnswers: props.displayAnswers(props.reaction) };
  }

  render() {
    const { reaction, answerTo } = this.props;

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
        { this.renderMessage() }
        { this.renderActions() }
        { this.renderAnswerForm() }
        { this.renderAnswers() }

      </div>
    );
  }

  renderAuthor() {
    const { author } = this.props.reaction;
    let avatar = '/assets/images/default-avatar.png';

    if (author.avatar)
      avatar = 'http://localhost:4242' + author.avatar;

    return (
      <div className="reaction-author d-flex flex-row align-items-center p-2 border-bottom">
        <img className="reaction-author-image" src={avatar} />
        <span className="reaction-author-nick ml-2">{ author.nick }</span>
      </div>
    );
  }

  renderEditionDate() {
    const { reaction } = this.props;
    const date = new Date(reaction.date);

    return (
      <div className="reaction-edition position-absolute p-2 text-muted">
        { dateformat(date, '"Le" dd/mm/yyyy "à" HH:MM') }
      </div>
    );
  }

  renderMessage() {
    const { reaction } = this.props;

    return (
      <div className="reaction-message p-2">
        { reaction.text.split('\n\n').map((p, n) => (
          <p key={n}>
            { p.split('\n').map((l, n) => (
              <span key={n}>{ l }<br /></span>
            )) }
          </p>
        )) }
      </div>
    );
  }

  renderActions() {
    const { reaction } = this.props;
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

        <button className="btn btn-sm btn-outline-dark mx-2 py-1 px-2">+1</button>

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
    const { information, reaction, onReactionSubmitted } = this.props;
    const { showAnswerInput } = this.state;

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
    const { reaction, toggleAnswers } = this.props;
    const { showAnswers } = this.state;
    const props = Object.assign({}, this.props);

    delete props.reaction;
    delete props.answerTo;

    if (!reaction.answers)
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
}

export default Reaction;
