import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewNameAlert: React.FC = () => {
  const alerted = window.localStorage.getItem('nna');
  const [closed, setClosed] = useState(false);

  if (closed || alerted)
    return null;

  window.localStorage.setItem('nna', '1');

  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        left: 0,
        bottom: 0,
        background: 'rgb(240, 250, 255)',
        color: '#040f4a',
        zIndex: 1,
        padding: '50px 80px',
        borderTop: '1px solid #CCF',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{ fontSize: 52, color: '#66C', position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
        onClick={() => setClosed(true)}
      >
        ×
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>CDV change de nom !</div>
        Chercheurs de vérité était un nom temporaire, initialement choisi comme un "troll" envers les
        communautés conspirationistes (pas très sympa...).
      </div>
      <div>
        Bienvenue sur <span style={{ fontWeight: 'bold' }}>Réagir à l'information</span> ! Même concept, toujours un nom
        temporaire mais cette fois complètement neutre. Le nom définitif reste encore à définir... Des idées ?
        Laissez-nous un <Link to="/faq#contact">petit message</Link> !
      </div>
    </div>
  );
};

export default NewNameAlert;
