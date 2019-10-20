import React from 'react';

import Link from 'src/components/Link';

import './NewNameBanner.scss';

const NewNameBanner: React.FC = () => (
  <div id="new-name-banner" className="hide">
    <div className="close">×</div>
    <div>
      <div className="new-name-banner-heading">CDV change de nom !</div>
      Chercheurs de vérité était un nom temporaire, initialement choisi comme un "troll" envers les
      communautés conspirationistes (pas très sympa...).
    </div>
    <div>
      Bienvenue sur <strong>Réagir à l'information</strong> ! Même concept, toujours un nom temporaire mais cette fois
      complètement neutre. Le nom définitif reste encore à définir... Des idées ? Laissez-nous un{' '}
      <Link href="/faq.html#contact">petit message</Link> !
    </div>
  </div>
);

export default NewNameBanner;
