import React from 'react';
import ReactModal from 'react-modal';
import dateformat from 'dateformat';

import MyContext from 'MyContext';
import request from 'Services/request-service';
import { Loading } from 'Components';

/**

ReactionHistory props:
- information: Information
- reaction: Reaction
- isModalOpen: boolean
- onRequestClose: () => {}

ReactionHistory state:
- loading: boolean
- history: Array<Message>

*/

ReactModal.setAppElement('#app');

class ReactionHistory extends React.Component {

  static contextType = MyContext;

  state = {
    loading: false,
    history: [],
  };

  async fetchHistory() {
    const { information, reaction } = this.props;

    await request('/api/information/' + information.slug + '/reaction/' + reaction.slug, {}, {
      200: json => this.setState({ history: json.history }),
      default: this.context.onError,
    });
  }

  async onModalAfterOpen() {
    this.setState({ loading: true });
    await this.fetchHistory();
    this.setState({ loading: false });
  }

  render() {
    const { reaction, isModalOpen, onRequestClose } = this.props;
    const { loading, history } = this.state;

    console.log([reaction, ...history]);

    return (
      <ReactModal
        isOpen={isModalOpen}
        onAfterOpen={this.onModalAfterOpen.bind(this)}
        onRequestClose={onRequestClose}
      >

        { this.state.loading
          ? <Loading />
          : [reaction, ...history].map(this.renderHistoryMessage.bind(this))
        }

      </ReactModal>
    );
  }

  renderHistoryMessage(message) {
    const date = new Date(message.date);

    return (
      <div key={message.date}>

        <div className="d-flex">
          <p className="p-2 text-muted">{dateformat(date, '"Le" dd/mm/yyyy "à" HH:MM')}</p>
          <div className="flex-grow-1 d-flex flex-column justify-content-center ml-2 mb-3">
            <div className="border-bottom"></div>
          </div>
        </div>

        <p>{ message.text }</p>

      </div>
    );
  }

}

export default ReactionHistory;
