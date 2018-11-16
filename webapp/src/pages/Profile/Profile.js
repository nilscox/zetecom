import React from 'react';
import { Redirect } from 'react-router';
import dateformat from 'dateformat';
import MyContext from '../../MyContext';
import request from '../../services/request-service';
import UserAvatar from '../../components/UserAvatar';

import './Profile.css';

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
      <div className="position-relative">

        <button
          onClick={this.onSignout.bind(this)}
          className="btn btn-secondary button-signout"
        >
          Déconnexion
        </button>

        <h2 className="text-center my-4">Mon profil</h2>

        <div className="container w-75 mr-auto">
          <div className="row py-1">
            Email: { user.email }
          </div>
          <div className="row py-1">
            Pseudo: { user.nick }
          </div>
          <div className="row py-1">
            Date d'inscription: { dateformat(new Date(user.signupDate), 'dd/mm/yyyy') }
          </div>
          <div className="row py-1">
            Avatar: <UserAvatar user={user} />
          </div>
        </div>

      </div>
    );
  }

}

export default Profile;
