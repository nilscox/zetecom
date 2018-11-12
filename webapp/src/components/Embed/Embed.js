import React from 'react';

import Loading from '../Loading';
import ReactionsList from '../ReactionsList';

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
    const res = await fetch('http://localhost:4242/api/information/by-url/' + this.props.youtubeUri);

    if (res.status === 200) {
      const json = await res.json();
      const res2 = await fetch('http://localhost:4242/api/information/' + json.slug);
      this.setState({ information: await res2.json() });
    }
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
