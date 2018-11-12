import React from 'react';

import Loading from '../Loading';
import ReactionsList from '../ReactionsList';
import request from '../../services/request-service';

class Embed extends React.Component {

  state = {
    information: null,
    loading: true,
  };

  async componentDidMount() {
    await this.fetchInformation();
    this.setState({ loading: false });
  }

  async fetchInformation() {
    await request('/api/information/by-url/' + this.props.youtubeUri, {}, {
      200: json => {
        await request('/api/information/' + json.slug, {}, {
          200: json => this.setState({ information: json }),
          default: this.props.onError,
        });
      },
      default: this.props.onError,
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
      return <p>Cette vidéo n'a pas encore de page de réactions associée. <a href="#">Créer ?</a></p>;

    return (
      <ReactionsList
        information={this.state.information}
        addReaction={this.addReaction.bind(this)}
      />
    );
  }

}

export default Embed;
