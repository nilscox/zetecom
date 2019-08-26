/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';
import { Link } from 'react-router-dom';

import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

import EmailValidatedAlert from './components/EmailValidatedAlert';
import Outline from './components/Outline';
import Card from './components/Card';

/*

Chercheurs de Vérité
Décryptons l'information !

En 10 mots:
  - CDV est un espace de discusions collaboratives en réaction à l'information
  - CDV est un espace d'échange collaboratif en réaction à l'information

Pourquoi ?
  - Rassembler une communauté de personnes pour réfléchir ensemble à ce que disent les médias
  - Lutter contre les fausses informations
  - Offrir une place aux débats dans un climat de confiance sur la toile

Comment ?
  - Des zones de commentaires liées à cdv intégrées sur les sites d'information
  - Un tri des commentaires par pertinence
  - Un cadre saint et rigoureux dans les échanges, instauré par une charte
  - Des messages correctement formatés pour maximiser la clareté des propos
  - Une modération des débats faite par des volontaires de la communauté

Qu'est-ce que c'est ?
  - Une communauté
  - Une extension pour les navigateurs
  - Un contrat d'utilisation (la charte)
  - Un algorithme de référencement
  - Une hiérarchie des réactions
  - Un support markdown
  - Une charte pour la modération

*/

const Sentence: React.FC<{ text: React.ReactNode; subtext: React.ReactNode }> = ({ text, subtext }) => (
  <Box ml={30}>
    <div><Text bold style={{ color: '#444' }}>{ text }</Text></div>
    <div><Text style={{ fontSize: 14 }}>{ subtext }</Text></div>
  </Box>
);

/* eslint-disable max-len */

const cards = [
  {
    text: 'Rassembler une communauté de personnes pour réfléchir ensemble',
    subtext: 'Parce que les informations telles que présentes dans les médias valent la peine d\'être discutées, pour être correctement interprêtées',
    image: '/assets/images/community.png',
  },
  {
    text: 'Lutter contre les fausses informations',
    subtext: 'Parce que malgré toute notre bonne volonté, on peut toujours se faire avoir par des biais, et croire pour de mauvaises raisons',
    image: '/assets/images/fake-news.png',
  },
  {
    text: 'Offrir une place aux débats dans un climat de confiance sur la toile',
    subtext: 'Parce qu\'il est souvent difficile de communiquer dans un cadre collaboratif et respectueux à travers un écran',
    image: '/assets/images/trust.png',
  },
];

const sentences = [
  {
    text: 'Une extension chrome intègre des zones de commentaires directement sur les sites d\'information',
    subtext: 'Pour savoir ce qu\'en pense la communauté tout de suite après avoir lu un article sur le site d\'un journal, ou une vidéo sur YouTube !',
  },
  {
    text: 'Des messages mis en avant, jugés les plus pertinents par la communauté',
    subtext: 'Pour voir les réactions les mieux construites, qui apportent des éléments clés, ou bien les plus controversées.',
  },
  {
    text: 'Un cadre sain et rigoureux, propice aux échanges',
    subtext: 'Pour participer aux échanges, il faut accepter une charte posant les bases nécessaires à un débat constructif.',
  },
  {
    text: 'Des messages mis en page ne façon structurée',
    subtext: 'Pour permettre la plus grande clareté, réactions peuvent comporter des liens, des listes, des tableaux, des titres, ...',
  },
  {
    text: 'Une modération des débats assurée par des membres de la communauté',
    subtext: 'Pour garder des échanges clairs et éviter les dérives, il faut parfois faire la police. On aimerait bien éviter, mais est-ce possible ?',
  },
];

/* eslint-enable max-len */

const Home: React.FC = () => (
  <div id="Home">

    <EmailValidatedAlert />

    <Outline>
      <p>
        <Link to="/"><em>Chercheurs de vérité</em></Link>, c'est une platforme qui donne accès à un <strong>espace
        d'échange collaboratif</strong>, pour réagir à l'information qui nous est transmise par les médias.
      </p>
      <p>
        Une <Link to="/utilisation">extension chrome</Link> permet d'ajouter sur certain sites internet, une zone de
        commentaire où les membres de la communauté partagent leurs opinions, apportent des sources, relèvent des
        biais, ou encore posent des questions...
      </p>
    </Outline>

    <Flex flexDirection="row" justifyContent="space-around">
      { cards.map((props, n) => <Card key={n} {...props} />) }
    </Flex>

    <Flex mt={60} flexDirection="row">

      <Flex flex={1}>
        <img
          src="/assets/images/youtube-cdv.gif"
          alt="screenshot youtube cdv"
          style={{ width: '100%', border: '1px solid #CCC' }}
        />
      </Flex>

      <Flex flex={1} flexDirection="column" justifyContent="space-between">
        { sentences.map((props, n) => <Sentence key={n} {...props} />) }
      </Flex>
    </Flex>

  </div>
);

export default Home;
