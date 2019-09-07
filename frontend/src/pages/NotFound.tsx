import React from 'react';

import Outline from './components/Outline';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Outline>404 - Vous êtes <em>perdu</em>... ?<br /><Link to="/">Retour à l'accueil</Link></Outline>
);

export default NotFound;
