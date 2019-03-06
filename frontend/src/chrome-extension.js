import React from 'react';
import ReactDOM from 'react-dom';
import { iframeResizer } from 'iframe-resizer';

import App from './App';

import { ReactionsList } from 'Components';
import { classList } from 'utils';

import './Label.css';

const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

class Extension extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayComments: 'cdv',
    };
  }

  render() {
    const { youtubeId } = this.props;

    return (
      <div className="d-flex flex-column align-items-center">

        <div className="btn-group btn-group-lg my-4">

          <button
            className={classList('btn', this.state.displayComments === 'youtube' ? 'btn-primary' : 'btn-secondary')}
            onClick={() => this.setState({ displayComments: 'youtube' })}
          >
            Commentaires YouTube
          </button>

          <button
            className={classList('btn', this.state.displayComments === 'cdv' ? 'btn-primary' : 'btn-secondary')}
            onClick={() => this.setState({ displayComments: 'cdv' })}
          >
            Commentaires CDV
          </button>

        </div>

        { this.state.displayComments === 'youtube' ? (
          <div ref={ref => ref && ref.appendChild(this.props.youtubeComments)}></div>
        ) : (
          <iframe
            id="cdv-iframe"
            src={'https://cdv.localhost/?youtubeId=' + youtubeId}
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
  const youtubeId = YOUTUBE_REGEX.exec(window.location.href);

  if (!youtubeId) {
    console.error('youtubeId not found x(');
    return;
  }

  if (!comments)
    return setTimeout(main, 100);

  const rootTag = document.createElement('div');
  const parent = comments.parentNode;

  comments.remove();
  parent.appendChild(rootTag);

  ReactDOM.render((
    <Extension
      youtubeId={youtubeId[1]}
      youtubeComments={comments}
    />
  ), rootTag, () => {
    setTimeout(() => {
      chrome.storage.local.get('token', ({ token }) => {
        const frame = document.getElementById('cdv-iframe');

        frame.contentWindow.postMessage({ event: 'setToken', token }, 'https://cdv.localhost');
      });
    }, 100);
  });

};

main();
