/* eslint-disable key-spacing, no-multi-spaces */

import Home from './Home';
import Rules from './Rules';
import Usage from './Usage';
import Motivations from './Motivations';
import FAQ from './FAQ';
import Beta from './Beta';

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
