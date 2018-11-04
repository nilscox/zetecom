import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const HeaderItem = ({ text, link }) => (
  <NavLink to={link} exact>
    <div className="header-item">
      { text }
    </div>
  </NavLink>
);

const Header = ({ user }) => (
  <div className="header">

    <div className="header-left">
      <HeaderItem text="Accueil" link="/" />
      <HeaderItem text="Information" link="/information" />
      <HeaderItem text="Aide" link="/help" />
    </div>

    <div className="header-right">
      { user ? (
        <HeaderItem text={user.email} link="/profile" />
      ) : (
        <HeaderItem text="Connexion" link="/signin" />
      ) }
    </div>

    <div className="clearfix" />

  </div>
);

export default Header;
