import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

const Header = ({ user }) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

    <NavLink className="navbar-brand" to="/">Chercheurs de vérité</NavLink>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbar">

      <div className="navbar-nav flex-grow-1">
        <NavLink to="/information" className="nav-item nav-link">Informations</NavLink>
        <NavLink to="/rules" className="nav-item nav-link">Règles</NavLink>
      </div>

      <div className="navbar-nav" style={{ flex: 0 }}>
        { user !== null && user ? (
          <NavLink to="/profile" className="nav-item nav-link">{ user.nick }</NavLink>
        ) : (
          <NavLink to="/signin" className="nav-item nav-link">Connexion</NavLink>
        ) }
      </div>

    </div>
  </nav>
);

export default connect(mapStateToProps)(Header);
