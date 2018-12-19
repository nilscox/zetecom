import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Loading } from 'Components';

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.loading.user,
});

const HeaderAuthLink = ({ loading, user }) => {
  if (loading)
    return <Loading size="small" />;

  if (user)
    return <NavLink to="/profile" className="nav-item nav-link">{ user.nick }</NavLink>;

  return <NavLink to="/auth/login" className="nav-item nav-link">Connexion</NavLink>;
};

const Header = ({ loading, user }) => (
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
        <HeaderAuthLink loading={loading} user={user} />
      </div>

    </div>
  </nav>
);

export default connect(mapStateToProps)(Header);
