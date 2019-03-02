import React from 'react';

import { Information, Reaction as ReactionType, User } from 'Types';
import { ReactionsList } from 'Components';

class App extends React.Component {

  state = {
    loading: true,
    information: null,
    reactions: null,
    user: null,
  };

  async componentDidMount() {
    const { token } = this.props;

    try {
      const query = window.location.search
        .slice(1).split('&')
        .reduce((obj, str) => (([k, v]) => { obj[k] = v; return obj; })(str.split('=')), {});

      const { youtubeId } = query;

      if (!youtubeId)
        return;

      const information = await this.fetchInformation(youtubeId)
      const reactions = await this.fetchReactions(information.id);
      const user = token ? await this.fetchMe(token) : null;

      this.setState({ information, reactions, user });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  async fetchMe(token) {
    const res = await fetch(`https://cdv.localhost/api/auth/tokenLogin`, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    });

    if (!res.ok)
      throw new Error('request failed');

    return new User(await res.json());
  }

  async fetchInformation(youtubeId) {
    const res = await fetch(`https://cdv.localhost/api/information/by-youtubeId/${youtubeId}`, {
      mode: 'cors',
      credentials: 'include',
    });

    if (!res.ok)
      throw new Error('request failed');

    return new Information(await res.json());
  }

  async fetchReactions(informationId) {
    const res = await fetch(`https://cdv.localhost/api/information/${informationId}/reactions`, {
      mode: 'cors',
      credentials: 'include',
    });

    if (!res.ok)
      throw new Error('request failed');

    return (await res.json()).map(r => new ReactionType(r));
  }

  render() {
    const { loading, reactions } = this.state;

    if (loading)
      return 'Loading...';

    if (!reactions)
      return <div />;

    return <ReactionsList reactions={reactions} />;
  }

}

export default App;
