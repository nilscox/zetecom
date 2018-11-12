import React from 'react';
import ReactDOM from 'react-dom';
import { iframeResizer } from 'iframe-resizer';

import ReactionsList from './components/ReactionsList';
import { classList } from './utils';

import './Label.css';

class Extension extends React.Component {

  state = {
    displayComments: 'cdv',
  };

  render() {
    const { uri } = this.props;

    return (
      <div className="d-flex flex-column align-items-center">

        <div className="btn-group btn-group-lg my-4">

          <button
            className={classList('btn', this.state.displayComments === 'cdv' ? 'btn-primary' : 'btn-secondary')}
            onClick={() => this.setState({ displayComments: 'cdv' })}
          >
            Commentaires YouTube
          </button>

          <button
            className={classList('btn', !this.state.displayComments == 'youtube' ? 'btn-primary' : 'btn-secondary')}
            onClick={() => this.setState({ displayComments: 'youtube' })}
          >
            Commentaires CDV
          </button>

        </div>

        { this.state.displayYoutubeComments ? (
          <div ref={ref => ref && ref.appendChild(this.props.youtubeComments)}></div>
        ) : (
          <iframe
            id="cdv-iframe"
            src={'https://localhost/embed/' + uri}
            style={{ width: 1, minWidth: '100%' }}
            scrolling="no"
            ref={ref => iframeResizer({ checkOrigin: false }, ref)}
          />
        ) }
      </div>
    );
  }
}

const main = () => {
  const comments = document.getElementById('comments');

  if (!comments)
    return setTimeout(main, 100);

  const rootTag = document.createElement('div');
  const parent = comments.parentNode;

  comments.remove();
  parent.appendChild(rootTag);

  ReactDOM.render((
    <Extension
      youtubeComments={comments}
      uri={encodeURIComponent(window.location.href)}
    />
  ), rootTag);
};

main();
