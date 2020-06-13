/* eslint-disable key-spacing, no-multi-spaces */

import Home from './pages/Home';
import Rules from './pages/Rules';
import Usage from './pages/Usage';
import Motivations from './pages/Motivations';
import FAQ from './pages/FAQ';
import Beta from './pages/Beta';

export type Page = {
  id: string;
  path: string;
  label: string | null;
  Component: React.ComponentType;
};

const pages: Array<Page> = [
  { id: 'home',         path: '/',                 label: 'Accueil',     Component: Home },
  { id: 'usage',        path: '/utilisation.html', label: 'Utilisation', Component: Usage },
  { id: 'rules',        path: '/charte.html',      label: 'La charte',   Component: Rules },
  { id: 'motivations',  path: '/motivations.html', label: 'Motivations', Component: Motivations },
  { id: 'faq',          path: '/faq.html',         label: 'FAQ',         Component: FAQ },
  { id: 'beta',         path: '/beta.html',        label: null,          Component: Beta },
];

export default pages;
