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
import imageYoutubRi from 'src/images/youtube-ri.gif';

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
      <Link href="/"><em>Réagir à l'information</em></Link>,
      c'est une plateforme qui donne accès à un <strong>espace d'échange collaboratif</strong>, pour discuter ensemble
      de l'information diffusée par les médias.

      <p className="hide">
        Une <Link href="/utilisation.html">extension chrome</Link> permet d'ajouter sur certains sites internet, une
        zone de commentaire où les membres de la communauté partagent leurs opinions, apportent des sources, relèvent
        des biais, ou encore posent des questions...
      </p>

    </div>

    <Title id="Les objectifs">Les objectifs ?</Title>

    <div className="why">

      <Card text="Rassembler une communauté de personnes pour réfléchir ensemble" image={imageCommunity}>
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

    <p>
      Depuis quelques dizaines d'années, les évolutions technologiques ont enclenché une vraie{' '}
      <Link openInNewTab href="https://fr.wikipedia.org/wiki/R%C3%A9volution_num%C3%A9rique">révolution</Link>, qui a
      radicalement bouleversé notre façon de communiquer <em>et de nous informer</em>. En contrepartie, un nombre
      croissant de problématiques liées à l'information émergent, notamment dans la diffusion de celle-ci par les
      médias. Les articles relatant des faits hors du commun étant plus attrayants, les contenus sont parfois plus
      sensationnalistes que vrais.
    </p>

    <p>
      Mais avons-nous <strong>les bons outils</strong> pour réfléchir ensemble, intelligemment, face à cette abondance
      d'information ? Réagir à l'information a pour ambition d'apporter des solutions à ces problèmes, en proposant une
      plateforme qui <em>vous</em> permet de réagir librement aux médias sur internet, comme des articles de presse ou
      des vidéos sur YouTube.
    </p>

    <DownloadExtension>Installer l'extension chrome</DownloadExtension>

    <Title id="Comment">Comment ?</Title>

    <div className="what">

      <Image src={imageYoutubRi} alt="screenshot youtube / Réagir à l'information" />

      <div className="what-items">

        <div className="what-item">
          <h3>
            Des zones de commentaires intégrées directement sur les sites d'information, via une extension chrome
          </h3>
          <p>
            Pour savoir ce qu'en pense la communauté, tout de suite après avoir lu un article sur le site d'un journal,
            ou une vidéo sur YouTube !
          </p>
        </div>

        <div className="what-item">
          <h3>Des messages mis en avant, jugés les plus pertinents par la communauté</h3>
          <p>
            Pour voir les réactions les mieux construites, qui apportent des éléments clés, ou bien les plus
            controversées.
          </p>
        </div>

        <div className="what-item">
          <h3>Un cadre sain, propice aux échanges</h3>
          <p>
            Pour participer aux échanges, il faut accepter une charte posant les bases nécessaires à un débat
            constructif.
          </p>
        </div>

        <div className="what-item">
          <h3>Des messages mis en page de façon structurée</h3>
          <p>
            Pour permettre une plus grande clarté, les réactions peuvent comporter des liens, des listes, des tableaux,
            des titres, etc.
          </p>
        </div>

        <div className="what-item">
          <h3>Une modération des débats assurée par des membres de la communauté</h3>
          <p>
            Pour garder des échanges clairs et éviter les dérives, il faut parfois faire la police. On aimerait bien
            éviter, mais est-ce possible ?
          </p>
        </div>

      </div>
    </div>

    <p>
      Nous tentons de rassembler sur cette plateforme, des personnes bienveillantes, attentives aux biais, qui savent
      écouter et partager leurs opinions, tout en gardant un œil critique face aux arguments qu'on leur présente.
      Si vous voulez mieux comprendre l'information et participer à des échanges constructifs sur internet, prenez une
      seconde pour ajouter un marque page, et pourquoi pas{' '}
      <Link href="/utilisation.html#Inscription">vous inscrire</Link> !
    </p>

    <p className="wording">
      Mais il est certes difficile de constituer une telle communauté. Un point central du projet repose sur{' '}
      <Link href="/charte.html">la charte</Link>, qui tente d'apporter un cadre propice aux débats. Consacrez une
      dizaine de minutes à sa lecture, avant de vous inscrire. Et si vous souhaitez apporter une évolution des règles,
      n'hésitez pas à <Link href="/faq.html#contact">envoyer un message</Link> à l'équipe qui développe le projet.
    </p>

    <p>
      Vous voulez en savoir plus ? La page <Link href="/motivations.html">motivations</Link> explique plus en détail les
      raisons pour lesquelles le projet a vu le jour, et son état d'esprit. Et pour commencer à utiliser l'extension dès
      maintenant, rendez-vous sur la page <Link href="/utilisation.html">utilisation</Link>. A bientôt sur internet !
    </p>

  </>
);

export default Home;
