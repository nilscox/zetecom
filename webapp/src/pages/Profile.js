import React from 'react';
import { Redirect } from 'react-router';
import request from '../services/request-service';

class Profile extends React.Component {

  async onSignout(e) {
    e.preventDefault();

    const res = await request('/api/auth/signout', {
      method: 'POST',
    });

    if (res.status === 204)
      this.props.setUser(null);
  }

  render() {
    const { user } = this.props;

    if (!user)
      return <Redirect to="/signin" />;

    return (
      <div>
        <p>
          Profile: { user.email }
        </p>

        <button
          onClick={this.onSignout.bind(this)}
          className="btn btn-warning"
        >
          Déconnexion
        </button>

      </div>
    );
  }

}

export default Profile;
