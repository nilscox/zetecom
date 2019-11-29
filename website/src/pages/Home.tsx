/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';

import Title from 'src/components/Title';
import Link from 'src/components/Link';
import Image from 'src/components/Image';
import Card from 'src/components/Card';
import DownloadExtension from 'src/components/DownloadExtensionButton';

import imageCommunity from 'src/images/community.png';
import imageFakeNews from 'src/images/fake-news.png';
import imageTrust from 'src/images/trust.png';
import imageExtension from 'src/images/extension.png';
import gifReplies from 'src/images/replies.gif';
import gifQuickReactions from 'src/images/quick-reactions.gif';

import './Home.scss';

/*

Réagir à l'information
Décryptons l'information !

En 10 mots:
  - Réagir à l'information est un espace de discussions collaboratives en réaction à l'information
  - Réagir à l'information est un espace d'échange collaboratif en réaction à l'information

Pourquoi ?
  - Rassembler une communauté de personnes pour réfléchir ensemble à ce que disent les médias
  - Lutter contre les fausses informations
  - Offrir une place aux débats dans un climat de confiance sur la toile

Comment ?
  - Des zones de commentaires liées à Réagir à l'information intégrées sur les sites d'information
  - Un tri des commentaires par pertinence
  - Un cadre saint et rigoureux dans les échanges, instauré par une charte
  - Des messages correctement formatés pour maximiser la clarté des propos
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

const Home: React.FC = () => (
  <>

    <div className="heading">
      <Link href="/"><em>Réagir à l'information</em></Link>, c'est une plateforme qui donne accès à un <strong>espace
      d'échange collaboratif</strong>, pour discuter de l'information diffusée par les médias, tout en gardant un œil
      critique.
    </div>

    <Title id="Les objectifs">Les objectifs ?</Title>

    <div className="objectives">

      <Card text="Réunir une communauté de personnes pour réfléchir ensemble" image={imageCommunity}>
        Parce que les informations telles qu'elles sont présentées dans les médias méritent souvent d'être discutées
        pour être correctement interprétées
      </Card>

      <Card text="Lutter contre les fausses informations" image={imageFakeNews}>
        Parce qu'il ne sufft pas de vouloir être informé pour ne pas être induit en erreur, et croire pour de mauvaises
        raisons
      </Card>

      <Card text="Offrir une place aux débats dans un climat de confiance sur la toile" image={imageTrust}>
        Parce qu'il est souvent difficile de communiquer dans un cadre collaboratif et respectueux à travers un écran
      </Card>

    </div>

    <Title id="Pourquoi">Pourquoi ?</Title>

    <div className="why">

      <p>
        Depuis quelques dizaines d'années, les évolutions technologiques ont enclenché une vraie{' '}
        <Link openInNewTab href="https://fr.wikipedia.org/wiki/R%C3%A9volution_num%C3%A9rique">révolution</Link>, qui a
        radicalement bouleversé notre façon de communiquer <em>et de nous informer</em>.<br />
        En contrepartie, un nombre
        croissant de problématiques liées à l'information émergent, notamment dans la diffusion de celle-ci par les
        médias. Les articles relatant des faits hors du commun étant plus attrayants, les contenus sont parfois plus
        sensationnalistes que vrais.
      </p>

      <div className="separator" />

      <p>
        Mais avons-nous <strong>les bons outils</strong> pour réfléchir ensemble, intelligemment, face à cette abondance
        d'information ?<br />
        Réagir à l'information a pour ambition d'apporter des solutions à ces problèmes, en proposant une plateforme qui
        <em>vous</em> permet de réagir aux médias sur internet, comme des articles de presse ou des vidéos sur YouTube.
      </p>

    </div>

    <Title id="Comment">Comment ?</Title>

    <div className="what-integration">

      <div className="integration-text">
        <h3>
          Une exension chrome va <strong>intégrer</strong> des zones de commentaires sur les sites d'information que
          vous visitez.
        </h3>
        <h3>
          Ces commentaires doivent respecter <Link href="/charte.html">une charte</Link>, construite dans le but de
          favoriser des échanges argumentatifs et respectueux.
        </h3>
      </div>

      <div className="integration-image">
        <img src={imageExtension} alt="extension réagir à l'information" />
      </div>

    </div>

    <div className="what-advantages">
      <div className="what-item">
        <div className="what-image"></div>
        <h4 className="what-text">Réactions regroupées par thématiques</h4>
      </div>
      <div className="what-item">
        <div className="what-image">
          <img src={gifReplies} />
        </div>
        <h4 className="what-text">Réponses imbriquées</h4>
      </div>
      <div className="what-item">
        <div className="what-image">
          <img src={gifQuickReactions} />
        </div>
        <h4 className="what-text">Messages pertinents mis en avant</h4>
      </div>
      <div className="what-item">
        <div className="what-image"></div>
        <h4 className="what-text">Fils de discussions en favoris</h4>
      </div>
      <div className="what-item">
        <div className="what-image"></div>
        <h4 className="what-text">Messages structurés</h4>
      </div>
      {/* <div className="what-item">
        <div className="what-image"></div>
        <h4 className="what-text">Modération assurée par des personnes volontaires</h4>
      </div> */}
    </div>

    <DownloadExtension>Installer l'extension chrome</DownloadExtension>

    <p>
      Nous tentons de rassembler sur cette plateforme, des personnes bienveillantes, attentives aux biais, qui savent
      écouter et partager leurs opinions, tout en gardant un œil critique face aux arguments qu'on leur présente.
      Si vous voulez mieux comprendre l'information et participer à des échanges constructifs sur internet, prenez une
      seconde pour ajouter un marque page, et pourquoi pas{' '}
      <Link href="/utilisation.html#Inscription">vous inscrire</Link> !
    </p>

  </>
);

export default Home;
