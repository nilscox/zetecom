import React from 'react';
import { Redirect } from 'react-router-dom';
import request from '../../services/request-service';
import FormInput from '../../components/FormInput';
import MyContext from '../../MyContext';
import { classList } from '../../utils';

/**

AddInformationForm props:
(none)

AddInformation state:
- url: string
- title: string
- displayFullForm: boolean
- created: ?boolean
- errors: Object,

*/

class AddInformationForm extends React.Component {

  static contextType = MyContext;

  state = {
    url: '',
    title: '',
    displayFullForm: false,
    created: null,
    errors: {},
  };

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ displayFullForm: true, errors: {} });

    const { url, title } = this.state;

    const res = await request('/api/information', {
      method: 'POST',
      body: { title, url },
    }, {
      200: json => this.setState({ created: json }),
      400: json => this.setState({ errors: json }),
      default: this.context.onError,
    });
  }

  render() {
    const { created, displayFullForm } = this.state;
    const { user } = this.context;

    if (created)
      return <Redirect to={'/information/' + created.slug} />;

    return (
      <form className="p-5" onSubmit={this.onSubmit.bind(this)}>

        { this.renderUrlInput() }

        { displayFullForm && this.renderTitleInput() }

      </form>
    );
  }

  renderUrlInput() {
    return (
      <FormInput
        type="text"
        placeholder="Ajouter une URL..."
        error={this.state.errors.url}
        onFocus={() => this.setState({ displayFullForm: true })}
        onChange={e => this.setState({ url: e.target.value })}
        groupClassName={classList('information-url', 'input-group-lg')}
        after={(
          <div className="input-group-append">
            <input type="submit" className="btn btn-success" value="GO!" />
          </div>
        )}
      />
    );
  }

  renderTitleInput() {
    const { errors } = this.state;

    return (
      <FormInput
        type="text"
        error={this.state.errors.title}
        placeholder="Titre de l'information"
        onChange={e => this.setState({ title: e.target.value })}
      />
    );
  }

}

export default AddInformationForm;
