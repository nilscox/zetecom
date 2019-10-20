import React from 'react';

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
      <a href="/faq#contact">petit message</a> !
    </div>
  </div>
);

export default NewNameBanner;
