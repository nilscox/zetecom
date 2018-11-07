import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import request from '../../services/request-service';
import Loading from '../../components/Loading';
import Reaction from '../../components/Reaction';
import ReactionForm from '../../components/ReactionForm';
import MyContext from '../../MyContext';
import labels, { labelText, labelBackgroundStyle, labelBorderStyle } from '../../services/label-service';
import { classList } from '../../utils';
import './Information.css';

/**

Information props:
- slug: string

Information state:
- information: Information
- notFound: boolean
- displayAnswers: boolean
- filterLabels: Array<string>
- sort: string

*/

class Information extends React.Component {

  static contextType = MyContext;

  state = {
    information: null,
    notFound: false,
    displayAnswers: [],
    filterLabels: ['SOURCE', 'METHOD', 'BIAIS'],
    sort: 'date',
  };

  componentDidMount() {
    this.fetchInformation();
  }

  getFilteredReactions() {
    const { information, filterLabels } = this.state;

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

    if (!information.reactions)
      return [];

    return filter(information.reactions);
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
    if (answerTo)
      this.setAnswersVisible(answerTo, true);

    this.fetchInformation();
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

        <div className="d-flex flex-row align-items-start">

          { this.renderSide() }
          { this.renderContent() }

        </div>

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
          className="info-image"
          src={information.image || '/assets/images/default-image.jpg'}
        />
        <a href={information.url} target="_blank">
          <h2 className="ml-4">{ information.title }</h2>
        </a>
      </div>
    );
  }

  renderSide() {
    const { filterLabels, sort } = this.state;

    return (
      <div className="reactions-side flex flex-column">

        <div className="mt-4">
          <strong className="side-label text-uppercase text-secondary">Filtrer</strong>
        </div>

        <div className="btn-group-vertical mx-2 border rounded">
          { labels.map(label => (
            <button
              key={label}
              className="btn btn-sm text-left"
              style={filterLabels.indexOf(label) >= 0 ? labelBackgroundStyle(label) : {}}
              onClick={() => this.toggleLabel(label)}
            >
              { labelText(label) }
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
    const { information, displayAnswers } = this.state;
    const displayAnswersFunc = reaction => !!displayAnswers.find(r => r.slug === reaction.slug);
    const toggleAnswers = this.toggleAnswers.bind(this);
    const onReactionSubmitted = this.onReactionSubmitted.bind(this);

    if (!information)
      return <Loading />;

    return (
      <div className="flex-grow-1 ml-4">

        { this.renderReactionForm() }

        { this.getFilteredReactions().map(r => (
          <Reaction
            key={r.slug}
            information={information}
            reaction={r}
            displayAnswers={displayAnswersFunc}
            toggleAnswers={toggleAnswers}
            onReactionSubmitted={onReactionSubmitted}
          />
        )) }

      </div>
    );
  }

  renderReactionForm() {
    const { information } = this.state;
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

export default Information;
