import React from 'react';

import MyContext from 'MyContext';
import labels, { labelText, labelBackgroundStyle, labelBorderStyle } from 'Services/label-service';
import { Loading, Link, Reaction, ReactionForm } from 'Components';
import { classList } from 'utils';

import './ReactionsList.css';

/**

ReactionsList props:
- information: Information
- addReaction: reaction => any

ReactionsList state:
- displayAnswers: boolean
- filterLabels: Array<string>
- sort: string

*/

class ReactionsList extends React.Component {

  static contextType = MyContext;

  state = {
    displayAnswers: [],
    filterLabels: ['SOURCE', 'METHOD', 'BIAIS'],
    sort: 'date',
  };

  getFilteredReactions() {
    const { information } = this.props;
    const { filterLabels } = this.state;

    if (!information.reactions)
      return null;

    const filter = reactions => {
      if (!reactions)
        return;

      const result = [];

      for (let i = 0; i < reactions.length; ++i) {
        const reaction = Object.assign({}, reactions[i]);

        if (filterLabels.indexOf(reaction.label) >= 0) {
          if (reaction.answers)
            reaction.answers = filter(reactions[i].answers);

          result.push(reaction);
        }
      }

      return result.length > 0 ? result : null;
    };

    return filter(information.reactions);
  }

  getTotalReactionsByLabel() {
    const { information } = this.props;

    if (!information)
      return;

    let result = labels.reduce((obj, label) => {
      obj[label] = 0;
      return obj;
    }, {});

    const calculate = reactions => {
      reactions.forEach(reaction => {
        result[reaction.label]++;

        if (reaction.answers)
          calculate(reaction.answers);
      });
    };

    calculate(information.reactions);

    return result;
  }

  toggleAnswers(reaction) {
    const displayAnswers = this.state.displayAnswers.slice();
    const idx = displayAnswers.findIndex(r => r.slug === reaction.slug);

    if (idx < 0)
      displayAnswers.push(reaction);
    else
      displayAnswers.splice(idx, 1);

    this.setState({ displayAnswers });
  }

  setAnswersVisible(reaction, visible) {
    const displayAnswers = this.state.displayAnswers.slice();
    const idx = displayAnswers.findIndex(r => r.slug === reaction.slug);

    if (idx < 0 && visible)
      displayAnswers.push(reaction);
    else if (!visible)
      displayAnswers.splice(idx, 1);

    this.setState({ displayAnswers });
  }

  toggleLabel(label) {
    const filterLabels = this.state.filterLabels.slice();
    const idx = filterLabels.findIndex(l => l === label);

    if (idx < 0)
      filterLabels.push(label);
    else {
      if (filterLabels.length === 1)
        return;

      filterLabels.splice(idx, 1);
    }

    this.setState({ filterLabels });
  }

  setSort(sort) {
    if (sort === this.state.sort)
      return;

    this.setState({ sort });
  }

  onReactionSubmitted(reaction, answerTo) {
    this.props.addReaction(reaction, answerTo);

    if (answerTo)
      this.setAnswersVisible(answerTo, true);
  }

  render() {
    return (
      <div className="reactions-list d-flex flex-row align-items-start">
        { this.renderSide() }
        { this.renderContent() }
      </div>
    );
  }

  renderSide() {
    const { filterLabels, sort } = this.state;
    const totalReactions = this.getTotalReactionsByLabel();

    return (
      <div className="reactions-side flex flex-column">

        <div className="mt-4">
          <strong className="side-label text-uppercase text-secondary">Filtrer</strong>
        </div>

        <div className="btn-group-vertical mx-2 border rounded">
          { labels.map(label => (
            <button
              key={label}
              className={classList('btn btn-sm text-left', filterLabels.indexOf(label) >= 0 && 'selected')}
              style={filterLabels.indexOf(label) >= 0 ? labelBackgroundStyle(label) : {}}
              onClick={() => this.toggleLabel(label)}
            >
              { totalReactions[label] } { labelText(label) }
            </button>
          )) }
        </div>

        <div className="mt-4">
          <strong className="side-label text-uppercase text-secondary">Trier</strong>
        </div>

        <div className="btn-group-vertical mx-2 border rounded">
          <button
            className={classList(['btn', 'btn-sm', 'text-left',
              'filter-sort',
              sort === 'pertinence' && 'selected'
            ])}
            onClick={() => this.setSort('pertinence')}
          >
            Par pertinence
          </button>

          <button
            className={classList(['btn', 'btn-sm', 'text-left',
              'filter-sort',
              sort === 'date' && 'selected'
            ])}
            onClick={() => this.setSort('date')}
          >
            Par date
          </button>

        </div>

      </div>
    );
  }

  renderContent() {
    const { information } = this.props;
    const { displayAnswers } = this.state;
    const displayAnswersFunc = reaction => !!displayAnswers.find(r => r.slug === reaction.slug);
    const toggleAnswers = this.toggleAnswers.bind(this);
    const onReactionSubmitted = this.onReactionSubmitted.bind(this);
    const filteredReactions = this.getFilteredReactions();

    return (
      <div className="flex-grow-1 ml-4">

        { this.renderReactionForm() }

        { (() => {
          if (!information.reactions.length) {
            return (
              <div className="alert alert-info">
                Il n'y a pas encore de commentaires à propos de cette information.
              </div>
            );
          } else if (!filteredReactions) {
            return (
              <div className="alert alert-info">
                Certains commentaires ne sont pas affichés.
              </div>
            );
          } else {
            return filteredReactions.map(r => (
              <Reaction
                key={r.slug}
                information={information}
                reaction={r}
                displayAnswers={displayAnswersFunc}
                toggleAnswers={toggleAnswers}
                onReactionSubmitted={onReactionSubmitted}
              />
            ));
          }
        })() }

      </div>
    );
  }

  renderReactionForm() {
    const { information } = this.props;
    const { user } = this.context;

    if (!user) {
      return (
        <div className="alert alert-warning" role="alert">
          <Link to="/signin">Connectez-vous</Link> pour publier un commentaire.
        </div>
      );
    }

    return (
      <ReactionForm
        information={information}
        onReactionSubmitted={this.onReactionSubmitted.bind(this)}
      />
    );
  }

}

export default ReactionsList;
