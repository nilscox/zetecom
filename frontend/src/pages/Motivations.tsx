/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import SubTitle from './components/SubTitle';
import Section from './components/Section';
import Note from './components/Note';
import Outline from './components/Outline';

/*

*plus ou moins en vrac*

- Scope : vision long terme, scope actuel (YouTube)
- définition de l'information dans le cadre de CDV

- problématiques liés à l'information
  - surinformation / infobésité
  - qualité de l'information
  - désinformation
  - fake news / junk news
  - publi-information
  - manque de rigueur des médias
  - addiction au buzz, aux contenus sensionalistes
  - biais et arguments fallacieux
  - manque de possibilité de réagir
  - manque d'organisation / modération
  - manque de bienveillance, d'ouverture d'esprit
  - manque d'esprit critique, de méthode
  - débat stérils / débat sémantique (dispute verbale)

- réponses à ces problématiques
  - non partisan
  - la charte
    - respect des autres
    - empêche les messages vides de sens
    - pousse à comprendres les opinions sans prégujés
  - réponses nestées
  - référencement des réactions
  - modération
  - transparence
  - Non partisan : aucune affiliation envers quelque entité que ce soit

- contexte du projet (esprit critique / zététique...)

*/

const Motivations: React.FC = () => {
  return (
    <div
      id="Motivations"
      className="page"
    >

      <p>
        <em>
          Cette page décrit plus en détail les raisons pour lesquelles CDV a vu le jour, et les problématiques
          auxquelles cette plateforme tente d'apporter des solutions. Mais... elle est en cours de rédaction ! Revenez
          vite :)
        </em>
      </p>

    </div>
  );
};

export default Motivations;
