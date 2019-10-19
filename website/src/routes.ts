/* eslint-disable key-spacing, no-multi-spaces */

import Home from './pages/Home';
import Rules from './pages/Rules';
import Usage from './pages/Usage';
import Motivations from './pages/Motivations';
import FAQ from './pages/FAQ';

export type Route = {
  id: string;
  path: string;
  label: string;
  Component: React.ComponentType;
};

const routes: Array<Route> = [
  { id: 'home',         path: '/',            label: 'Accueil',     Component: Home },
  { id: 'usage',        path: '/utilisation.html', label: 'Utilisation', Component: Usage },
  { id: 'rules',        path: '/charte.html',      label: 'La charte',   Component: Rules },
  { id: 'motivations',  path: '/motivations.html', label: 'Motivations', Component: Motivations },
  { id: 'faq',          path: '/faq.html',         label: 'FAQ',         Component: FAQ },
];

export default routes;
