import React from 'react';
import { Redirect } from 'react-router-dom';
import request from '../../services/request-service';
import Loading from '../../components/Loading';
import ReactionsList from '../../components/ReactionsList';
import MyContext from '../../MyContext';
import './Information.css';

/**

Information props:
- slug: string

Information state:
- information: Information
- notFound: boolean

*/

class Information extends React.Component {

  static contextType = MyContext;

  state = {
    information: null,
    notFound: false,
  };

  componentDidMount() {
    this.fetchInformation();
  }

  async fetchInformation() {
    const { slug } = this.props;
    const { filterLabels } = this.state;

    await request('/api/information/' + slug, {}, {
      200: json => this.setState({ information: json }),
      404: () => this.setState({ notFound: true }),
      default: this.context.onError,
    });
  }

  addReaction(reaction, answerTo) {
    const { information } = this.state;

    if (!information)
      return;

    const reactions = information.reactions.slice();

    if (!answerTo)
      reactions.unshift(reaction);
    else {
      const addReactionAnswer = reactions => {
        for (let i = 0; i < reactions.length; ++i) {
          const r = reactions[i];

          if (answerTo.slug === r.slug) {
            const answers = r.answers.slice();

            answers.unshift(reaction);
            r.answers = answers;
          } else {
            addReactionAnswer(r.answers);
          }
        }
      };

      addReactionAnswer(reactions);
    }

    this.setState({ information: { ...information, reactions } });
  }

  render() {
    const { information, notFound } = this.state;

    if (notFound)
      return <Redirect to="/information" />;

    if (!information)
      return <Loading />;

    return (
      <div className="information">
        { this.renderHeader() }
        <ReactionsList information={information} addReaction={this.addReaction.bind(this)} />
      </div>
    );
  }

  renderHeader() {
    const { information } = this.state;

    if (!information)
      return;

    return (
      <div className="info-header d-flex flex-row align-items-center my-4">
        <img
          className="info-image img img-thumbnail"
          src={information.image || '/assets/images/default-image.jpg'}
        />
        <a href={information.url} target="_blank">
          <h2 className="ml-4">{ information.title }</h2>
        </a>
      </div>
    );
  }


}

export default Information;
