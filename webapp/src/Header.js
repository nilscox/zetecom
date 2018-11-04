import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const HeaderItem = ({ name, link }) => (
  <NavLink to={link} exact>
    <div className="header-item">
      { name }
    </div>
  </NavLink>
);

const Header = () => (
  <div className="header">

    <div className="header-left">
      <HeaderItem name="Accueil" link="/" />
      <HeaderItem name="Information" link="/information" />
      <HeaderItem name="Aide" link="/help" />
    </div>

    <div className="header-right">
      <HeaderItem name="Connexion" link="/signin" />
    </div>

    <div className="clearfix" />

  </div>
);

export default Header;
