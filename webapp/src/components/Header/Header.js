import * as React from 'react';
import { NavLink } from 'react-router-dom';
import MyContext from '../../MyContext';

/**

Header props:
(none)

Header state:
(none)

*/

class Header extends React.Component {

  static contextType = MyContext;

  render() {
    const { user } = this.context;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

        <NavLink className="navbar-brand" to="/">Chercheurs de vérité</NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <div className="navbar-nav flex-grow-1">
            <NavLink to="/information" className="nav-item nav-link">Information</NavLink>
            <NavLink to="/help" className="nav-item nav-link">Aide</NavLink>
          </div>

          <div className="navbar-nav" style={{ flex: 0 }}>
            { user !== false && user ? (
              <NavLink to="/profile" className="nav-item nav-link">{ user.nick }</NavLink>
            ) : (
              <NavLink to="/signin" className="nav-item nav-link">Connexion</NavLink>
            ) }
          </div>

        </div>
      </nav>
    );
  }

}

export default Header;
