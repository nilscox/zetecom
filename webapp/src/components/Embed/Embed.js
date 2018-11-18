import React from 'react';

import MyContext from 'MyContext';
import request from 'Services/request-service';
import { Loading, Link, ReactionsList } from 'Components';

/**

Embed props:
- youtubeId: string

Embed state:
- information: ?Information
- loading: boolean

*/

class Embed extends React.Component {

  static contextType = MyContext;

  state = {
    information: null,
    loading: true,
  };

  async componentDidMount() {
    await this.fetchInformation();
    this.setState({ loading: false });
  }

  async fetchInformation() {
    await request('/api/information/by-youtubeId/' + this.props.youtubeId, {}, {
      200: async json => {
        await request('/api/information/' + json.slug, {}, {
          200: json => this.setState({ information: json }),
          default: this.context.onError,
        });
      },
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
    const { loading, information } = this.state;

    if (loading)
      return <Loading />;

    if (!information)
      return (
        <div
          className="alert alert-info"
        >
          Cette vidéo n'a pas encore de page de réactions associée sur <strong>Chercheurs de vérité</strong>. <Link to="/information">Créer ?</Link>
        </div>
      );

    return (
      <ReactionsList
        information={this.state.information}
        addReaction={this.addReaction.bind(this)}
      />
    );
  }

}

export default Embed;
