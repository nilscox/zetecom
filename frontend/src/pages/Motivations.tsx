/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import SubTitle from './components/SubTitle';
import Section from './components/Section';
import Note from './components/Note';
import Outline from './components/Outline';

/*

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
          auxquelles ce projet tente d'apporter des solutions. Il est conseillé de la lire pour comprendre plus en
          profondeur les enjeux liés au contexte de l'information, et les choix établis.
        </em>
      </p>

      <Note>
        Cette page (ainsi que toutes les pages du site) évoluent ! Les motivations et idées développées ici sont vouées
        à évoluer au fil du temps, dans le but de toujours mieux répondre aux différentes problématiques. Les membres de
        l'équipe de CDV sont à l'écoute si vous êtes disposé à donner votre avis ou réfléchir aux meilleur solutions
        possibles pour l'avenir du projet.
        Pour le moment, <a href="mailto:nils@nils.cx">un simple mail</a> d'introduction suffit pour participer à
        l'évolution de CDV.
      </Note>

      <Section title="L'information sur internet">

        <p>
          Avec l'arrivée des nouvelles technologies de communication, l'accès à la conaissance est devenu presque aussi
          simple qu'une recherche sur google. Notre capacité à transmettre ou à recevoir de l'information s'est
          retrouvée bouleversée au cours de ces dernières années.
        </p>

        <p>
          Il faut dire que la qualité des informations présentent sur internet peut varier : des articles de press au
          postes d'un bloggeur conspirationiste, en passant par les publications scientifiques et la vulgarisation...
          Faire le tri est devenu un combat quotidien, car les conaissances pertinentes sur le monde qui nous entoure
          sont souvent noyées sous un flot d'"information" qui sont à nuancer, quitte à les rejeter
          entièrement dans le cas des fake news par exemple.
        </p>

        <p>
          Mais que pensez-vous de l'information ? Vous en parlez certainement en privé avec vos amis, votre famille, ou
          au boulot... Sur internet, cela passe le plus souvent par un espace de commentaire, directement attaché à
          l'information, sur site web des médias ou sur YouTube par exemple. Une des problématiques majeur des espaces
          de commentaires sur internet est le manque d'organisation, qui n'est pas une priorité pour la plateforme sur
          laquelle on s'exprime.
        </p>

      </Section>

      <SubTitle>L'information</SubTitle>

      <p>
        Le but de CDV étant de proposer un espace d'échange en réaction à l'information, il semble être
        important de définir ce que nous entendons par "information". Dans le cadre de CDV, l'information est :
      </p>

      <Outline>
        la transmission de la connaissance d’un fait via un canal de communication.
      </Outline>

      <p>
        Bien souvent, l'information telle qu'on l'entend fait référence à <em>l'actualité</em>, c'est à dire les
        informations présentées dans les médias ("les infos"). Dans le cadre de CDV, la définition qu'il faut prendre en
        compte est plus large que ça : c'est une <strong>forme de communication qui nous apprend quelque chose</strong>,
        par exemple via un article dans un journal, une émission à la télévision, un article dans une revue
        scientifique, un post sur un blog, une vidéo sur YouTube...
      </p>

      <p>
        L'information est un moyen pour chacun de connaitre son environnement, c'est à dire de savoir ce qu'il se passe
        dans le monde qui nous entoure. C'est donc un élément crucial de notre société, car c'est avec ces conaissances
        que nous pouvons comprendre le monde, et donc prendre des décisions dans la vie de tous les jours. Avec
        l'arrivée des nouvelle technologies de communication, l'accès à l'information devient de plus en plus facile.
        Malheureusement, cela vient avec un certain nombre d'inconvéniants qu'il est difficile à maitriser, les fake
        news en sont l'exemple le plus marquant. Et il est difficile de faire le tri, surtout lorsque l'on a
        constamment l'impression d'être correctement informés.
      </p>

      <p>
        Le but principal de <em>CDV</em> est de tenter d'apporter un peu d'ordre dans tout ça, de manière intelligente
        et bienveillante, et dans l'intérêt de tous.
      </p>

      <Note>
        Cette page est en cours de rédaction, la suite n'est pas encore vraiment rédigée...
      </Note>

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

      <SubTitle>Les solutions apportées par CDV</SubTitle>

      <Section>
        <strong>Les 3 piliers fondamentaux</strong>
        <ul>
          <li>La communauté ;</li>
          <li>la charte ;</li>
          <li>l'algorithme de référencement.</li>
        </ul>
      </Section>

      <Section>
        <strong>But de la charte</strong>
        <p>
          La charte de CDV est un point central du fonctionnement du système.
        </p>
      </Section>

    </div>
  );
};

export default Motivations;
