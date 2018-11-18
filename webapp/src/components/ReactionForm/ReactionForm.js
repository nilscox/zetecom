import React from 'react';

import MyContext from 'MyContext';
import request from 'Services/request-service';
import { getErrorMessage } from 'Services/errors-service';
import labels, { labelText, labelBackgroundStyle, labelBorderStyle } from 'Services/label-service';
import { UserAvatar } from 'Components';
import { classList } from 'utils';

import './ReactionForm.css';

/**

ReactionForm props:
- information: Information
- reaction: Reaction
- answerTo: Reaction
- onClose: () => {}
- onReactionSubmitted: reaction => {}

ReactionForm state:
- focus: boolean
- text: string
- label: ?string
- errors: Object

*/

class ReactionForm extends React.Component {

  static contextType = MyContext;

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
    this.setState({ errors: {} });

    const { information, reaction, answerTo } = this.props;
    const { label, text, quote, errors } = this.state;

    if (!label) {
      this.setState({ errors: { ...errors, label: 'MISSING_LABEL' } });
      return;
    }

    let url = '/api/information/' + information.slug + '/reaction';
    const body = { text };

    if (reaction)
      url += '/' + reaction.slug + '/edit';
    else {
      Object.assign(body, {
        label,
        quote: quote.length ? quote : undefined,
        answerTo: answerTo ? answerTo.slug : undefined,
      });
    }

    await request(url, {
      method: 'POST',
      body,
    }, {
      200: json => {
        this.props.onReactionSubmitted(json, answerTo);

        if (this.props.onClose)
          this.props.onClose();
        else
          this.setState({ focus: false, text: '', quote: '', label: null, errors: {} });
      },
      400: json => this.setState({ errors: json }),
      default: this.context.onError,
    });
  }

  render() {
    const { answerTo } = this.props;

    return (
      <div className={classList(['reaction-form', 'border rounded', 'position-relative', 'mb-2',
        answerTo ? ' ml-3 border-right-0 border-bottom-0' : ' mb-2',
      ])}>

        { this.renderClose() }
        { this.renderAuthor() }
        { this.renderForm() }

      </div>
    );
  }

  renderClose() {
    const { onClose } = this.props;

    if (!onClose)
      return;

    return (
      <div
        className="reaction-form-close m-1"
        onClick={onClose}
      >
        ✖
      </div>
    );
  }

  renderAuthor() {
    const { user } = this.context;

    return (
      <div className="reaction-author d-flex flex-row align-items-center p-2">
        <UserAvatar className="reaction-author-image" user={user} />
        <span className="reaction-author-nick ml-2">{ user.nick }</span>
      </div>
    );
  }

  renderForm() {
    const { answerTo } = this.props;
    const { text, focus } = this.state;

    return (
      <form className="reaction-form p-2" onSubmit={this.onSubmit.bind(this)}>

        { this.renderTextInput() }
        { !answerTo && this.renderQuoteInput() }

        <div className="container">
          <div className="row">

            { this.renderFormLabels() }
            { this.renderFormSubmitBtn() }

          </div>
        </div>

      </form>
    );
  }

  renderQuoteInput() {
    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Citation (optionelle)"
          onChange={e => this.setState({ quote: e.target.value })}
        />
      </div>
    );
  }

  renderTextInput() {
    const { answerTo } = this.props;
    const { focus, text, errors } = this.state;
    const { text: error } = errors;

    return (
      <div className="form-group">

        <textarea
          className={classList('reaction-textarea', 'w-100', 'form-control', 'border-bottom', error && 'is-invalid')}
          rows={focus || text.length > 0 ? 3 : 1}
          value={text}
          placeholder={answerTo ? 'Répondre à ' + answerTo.author.nick +  '...' : 'Nouveau commentaire...'}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          onChange={e => this.setState({ text: e.target.value })}
        ></textarea>

        <div className="invalid-feedback ml-1">
          { getErrorMessage(error) }
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
      <div className="col labels">

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
          { getErrorMessage(this.state.errors.label) }
        </div>

      </div>
    );
  }

  renderFormSubmitBtn() {
    const { text } = this.state;

    return (
      <div className="col-auto">
        <input
          type="submit"
          className={classList('submit-btn', 'btn', 'btn-sm', 'btn-primary', text.length && 'btn-disabled')}
          value="Envoyer"
        />
      </div>
    );
  }

}

export default ReactionForm;
