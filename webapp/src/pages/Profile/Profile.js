import React from 'react';
import { Redirect } from 'react-router';
import MyContext from '../../MyContext';
import request from '../../services/request-service';

/**

Profile props:
(none)

Profile state:
(none)

*/

class Profile extends React.Component {

  static contextType = MyContext;

  async onSignout(e) {
    e.preventDefault();

    const res = await request('/api/auth/signout', {
      method: 'POST',
    }, {
      204: () => this.context.setUser(null),
      default: this.context.onError,
    });
  }

  render() {
    const { user } = this.context;

    if (!user)
      return <Redirect to="/signin" />;

    return (
      <div>
        <p>
          Profile: { user.email }
        </p>

        <button
          onClick={this.onSignout.bind(this)}
          className="btn btn-dark"
        >
          Déconnexion
        </button>

      </div>
    );
  }

}

export default Profile;
