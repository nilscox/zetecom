import React from 'react';
import PropTypes from 'prop-types';

import labels, { labelText, labelBackgroundStyle, labelBorderStyle } from 'Services/label-service';
import { UserConsumer } from 'Contexts';
import { UserAvatar } from 'Components';
import ReactionHeader from 'Components/Reaction/ReactionHeader';
import { classList } from 'utils';
import { Reaction } from 'Types';

import './ReactionForm.css';

class ReactionForm extends React.Component {

  state = {
    focus: false,
    text: '',
    quote: '',
    label: null,
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    const obj = {};

    if (state.text === '' && props.reaction) {
      obj.text = props.reaction.text;
      obj.quote = props.reaction.quote;
      obj.label = props.reaction.label;
    }

    return obj;
  }

  async onSubmit(e) {
    e.preventDefault();

    const informationId = 1; // TODO
    const { text, quote, label } = this.state;

    if (!text.length || !label)
      return;

    const res = await fetch(`https://cdv.localhost/api/reaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ informationId, text, quote, label }),
      mode: 'cors',
      credentials: 'include',
    });

    if (!res.ok)
      throw new Error('request failed');

    this.props.onReactionSubmitted(await res.json());

    this.setState({
      text: '',
      quote: '',
      label: null,
    });
  }

  render() {
    const { replyTo } = this.props;

    return (
      <UserConsumer>
      { user => user && (
        <div
          className={classList([
            'reaction-form',
            replyTo && 'reply',
            'position-relative',
            replyTo ? 'border-top border-left' : 'border',
            replyTo ? 'mt-2' : 'my-2',
          ])}
        >

          { this.renderClose() }

          <ReactionHeader author={user} />

          { this.renderForm() }

        </div>
      ) }
      </UserConsumer>
    );
  }

  renderClose() {
    const { onClose } = this.props;

    if (!onClose)
      return;

    return (
      <div className="reaction-form-close mr-1" onClick={onClose}>✕</div>
    );
  }

  renderForm() {
    const { replyTo } = this.props;
    const { text, focus } = this.state;

    return (
      <form className="p-2" onSubmit={this.onSubmit.bind(this)}>

        { !replyTo && this.renderQuoteInput() }

        { this.renderTextInput() }

        <div className="d-flex">
          { this.renderFormLabels() }
          <div className="flex-grow-1" />
          { this.renderFormSubmitBtn() }
        </div>

      </form>
    );
  }

  renderQuoteInput() {
    return (
      <div className="form-group">
        <input
          type="text"
          style={{ border: 0 }}
          className="form-control border-bottom"
          placeholder="Citation (optionelle)"
          onChange={e => this.setState({ quote: e.target.value })}
          value={this.state.quote}
        />
      </div>
    );
  }

  renderTextInput() {
    const { replyTo } = this.props;
    const { focus, text, errors } = this.state;
    const { text: error } = errors;

    return (
      <div className="form-group">

        <textarea
          className={classList('reaction-textarea', 'w-100', 'form-control', 'border-bottom', error && 'is-invalid')}
          rows={focus || text.length > 0 ? 3 : 1}
          value={text}
          placeholder={replyTo ? 'Répondre à ' + replyTo.author.nick +  '...' : 'Nouveau commentaire...'}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          onChange={e => this.setState({ text: e.target.value })}
        ></textarea>

        <div className="invalid-feedback ml-1">
          { /* getErrorMessage(error) */ }
        </div>

      </div>
    );
  }

  renderFormLabels() {
    const setLabel = label => {
      if (this.props.reaction)
        return;

      this.setState({ label, errors: { ...this.state.errors, label: null } });
    };

    return (
      <div className="labels">

        <div className="btn-group btn-group-sm border rounded">

          { labels.map(label => (
            <button
              type="button"
              key={label}
              className={classList('btn', this.state.label === label && 'selected')}
              style={{
                ...(this.state.label === label ? labelBackgroundStyle(label) : {}),
              }}
              onClick={() => setLabel(label)}
            >
              { labelText(label) }
            </button>
          )) }

        </div>

        <div className="label-invalid mt-1">
          { /* getErrorMessage(this.state.errors.label) */ }
        </div>

      </div>
    );
  }

  renderFormSubmitBtn() {
    const { text } = this.state;

    return (
      <div>
        <input
          type="submit"
          className={classList('submit-btn', 'btn', 'btn-sm', 'btn-primary')}
          disabled={!text.length}
          value="Envoyer"
        />
      </div>
    );
  }

}

ReactionForm.propTypes = {
  reaction: PropTypes.instanceOf(Reaction),
  replyTo: PropTypes.instanceOf(Reaction),
  onClose: PropTypes.func,
  onReactionSubmitted: PropTypes.func.isRequired,
};

export default ReactionForm;
