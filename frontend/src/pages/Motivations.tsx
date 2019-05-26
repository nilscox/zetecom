/* eslint-disable react/no-unescaped-entities */

import React from 'react';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Section from './components/Section';

const Motivations: React.FC = () => {
  return (
    <div
      id="Motivations"
      className="page"
    >

      <Title>Motivations</Title>

      <SubTitle>L'information</SubTitle>

      <ol>

        <li>
          Action d'informer ou de s'informer.<br />
          Donner la connaissance d'un fait ou de la rechercher.
        </li>

        <li>
          Renseignement, documentation sur quelque chose ou quelqu'un.<br />
          Elément de connaissance susceptible d’être représentée afin d’être conservée, traitée, communiquée.
        </li>

        <li>
          Instruction d'un procès criminel.<br />
          Une information judiciaire est une enquête judiciaire déclenchée par le procureur de la République dans les
          affaires complexes et confiée à un juge d'instruction, préalablement au jugement
        </li>
        <li>
          Actualité, nouvelle diffusées par un média (presse, radio, télévision, internet...).
        </li>

      </ol>

      <p>
        La transmission de la connaissance d’un fait via un canal de communication.
      </p>

      <p>
        Exemples :
      </p>
      <ul>
        <li>d'un scientifique à un pair, via une revue scientifique</li>
        <li>d'un journal TV à ses auditeurs, via un billet d'information rédigé à l'avance et présenté en live</li>
        <li>de moi à vous, via des vibration de l'air</li>
        <li>d'un bloggeur à vous, sur internet</li>
      </ul>

      <p>
        Moyen pour un individu de connaitre son environnement.<br />
        Facile d’accès
      </p>

      <SubTitle>Les problématiques liées à l'information</SubTitle>

      <Section>
        <strong>La politique</strong>
      </Section>

      <Section>
        <strong>L'antiprofessionalisme de certain médias</strong>
      </Section>

      <Section>
        <strong>La publi-information</strong>
        <p>
          publicité présentée comme un reportage
        </p>
      </Section>

      <Section>
        <strong>La désinformation</strong>

        <p>
          processus de communication qui consiste à utiliser les médias pour transmettre des informations partiellement
          erronées dans le but de tromper ou d'influencer l'opinion publique et de l'amener à agir dans une certaine
          direction.
        </p>

        <p>
          exemples de méthodes de désinformation :
        </p>

        <ul>
          <li>dénaturer l'information initiale ou la présenter en ne disant qu'une partie de la vérité</li>
          <li>donner à certaines informations une importance et un poids plus important que leur poids réel</li>
          <li>opérer des regroupements intempestifs ou illogiques</li>
          <li>utiliser de faux documents</li>
        </ul>

        <p>
          toute information qui sur-évalue un peu certains résultats, ou qui passe sous silence certains points pour
          renforcer la thèse initial est, selon un certain degré, de la désinformation. Si ce degré de "désinformation"
          peut être négligé, alors l'information reste de qualité.
        </p>
      </Section>

      <Section>
        <strong>Fausse informations</strong>
      </Section>

      <Section>
        <strong>Manque d’organisation</strong>
      </Section>

      <Section>
        <strong>Modération difficile</strong>
      </Section>

      <Section>
        <strong>Manque de bienveillance et d’ouverture d’esprit</strong>

        <ul>
          <li>rageux, trolls, ...</li>
          <li>politique de l’autruche</li>
          <li>négligence des autres parce que identité masquée</li>
        </ul>
      </Section>

      <Section>
        <strong>Manque d’esprit critique, de méthode</strong>

        <ul>
          <li>des biais peuvent apparaître (biais de confirmation)</li>
          <li>on croit plus facilement ce qui confirme ce que l’on pense</li>
          <li>on ne va pas chercher les sources</li>
          <li>qd l’info va ds notre sens, on va l’embellir</li>
          <li>qd elle dit des choses que nous n'apprécions pas, on va l’oublier</li>
          <li>chacun a des valeurs, des goûts, des motivations différentes</li>
        </ul>
      </Section>

    </div>
  );
};

export default Motivations;
