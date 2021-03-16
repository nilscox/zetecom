/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';

import Title from 'src/components/Title';
import Link from 'src/components/Link';
import Card from 'src/components/Card';
import { DownloadExtension } from 'src/components/DownloadExtensionsButtons';
import RouterLink from 'src/components/Link/RouterLink';
import Box from 'src/components/Box';

import imageCommunity from './images/community.png';
import imageCharter from './images/charter.png';
import imageIndependence from './images/independence.png';
import imageCheck from './images/check.png';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.scss';
import AppLink from 'src/components/Link/AppLink';
import { useEnvironment } from 'src/utils/env';

const Heading: React.FC = () => (
  <div className="heading">
    <p>
      Zétécom vous propose des zones de commentaires pour réagir à l'information sur internet, tout en cultivant votre{' '}
      <strong>autodéfense intellectuelle</strong>.
    </p>
    <p>
      Pour garantir des échanges constructifs, la communauté s'engage à respecter{' '}
      <RouterLink to="/charte.html">une charte</RouterLink> inspirée des principes de la pensée critique.
    </p>
  </div>
);

const Video: React.FC = () => <video loop autoPlay muted id="demo" src="/video.mp4" className="demo-video" />;

const KeyPoints = () => (
  <div className="key-points">
    <Card primary="La communauté" image={imageCommunity}>
      Composée de personnes qui cherchent à discuter dans "de bonnes conditions", qui savent écouter tout en gardant un
      œil critique
    </Card>
    <Card primary="La charte" image={imageCharter}>
      Elle définit l'état d'esprit à adopter dans les conversations, apportant le filtre nécessaire pour garantir des
      échanges pertinents
    </Card>
    <Card primary="L'indépendance" image={imageIndependence}>
      Open-source et gratuit, Zétécom n'est lié à aucune autorité capable d'influer dans les commentaires d'une
      quelconque manière
    </Card>
  </div>
);

const Check = () => <img className="check" src={imageCheck} />;

const Feature: React.FC = ({ children }) => (
  <div className="feature-item">
    <Check />
    <p>{children}</p>
  </div>
);

const Features = () => (
  <div className="features">
    <div className="feature-line">
      <Feature>
        <strong> Ouvrir une discussion n'importe où</strong>, même quand la zone de commentaires originale est fermée
      </Feature>
      <Feature>
        <strong>Intégrer les zones de commentaires</strong> sur les sites d'informations, via une extension disponible
        sur Chrome et Firefox
      </Feature>
    </div>

    <div className="feature-line">
      <Feature>
        <strong>Trier les messages par pertinence</strong> et voir tout de suite les commentaires ayant suscité le plus
        de réactions
      </Feature>
      <Feature>
        <strong>Voter</strong> : « j'aime », « je suis d'accord », « je ne suis pas d'accord », « ça me fait réfléchir
        », ou « je n'ai pas compris », et voir le nombre total de votes
      </Feature>
    </div>

    <div className="feature-line">
      <Feature>
        <strong>Rechercher</strong> par mots clés, pour trouver les commentaires qui parlent d'un sujet précis
      </Feature>
      <Feature>
        <strong>Être notifié.e</strong> quand une réponse est publiée à un commentaire suivi
      </Feature>
    </div>

    <div className="feature-line">
      <div style={{ flex: 1 }} />
      <Feature>
        <strong>Vos idées</strong> sont les bienvenues pour proposer d'ajouter des fonctionnalités qui seront utiles !
      </Feature>
      <div style={{ flex: 1 }} />
    </div>
  </div>
);

const Why: React.FC = () => (
  <div className="why">
    <p className="why-title">Quelques mots sur les raisons qui motivent ce projet</p>
    <div className="left-right">
      <div className="left">
        <p>
          Depuis quelques dizaines d'années, la digitalisation des modes de communication a enclenché une vraie{' '}
          <Link href="https://fr.wikipedia.org/wiki/R%C3%A9volution_num%C3%A9rique">révolution</Link>, qui a
          radicalement bouleversé notre façon de nous informer.
        </p>
        <p>
          Face à cela, de nouveaux problèmes liés à l'information émergent, notamment dans la manière dont elle est
          diffusée par les médias.
        </p>
      </div>
      <div className="separator" />
      <div className="right">
        <p>
          Quels outils avons-nous à notre disposition pour réfléchir ensemble, pour analyser, décortiquer l'information
          présente sur internet ?
        </p>
        <p>
          Le but de Zétécom est d'offrir la possibilité à tous d'ouvrir un dialogue sur des sujets d'actualité, avec des
          personnes à l'écoute et dans un cadre propice à des échanges qui ont du sens.
        </p>
      </div>
    </div>
    <Box marginTop="small">
      <p>
        Pour plus de détails sur les objectifs du projet, rendez-vous sur la page{' '}
        <RouterLink to="/motivations.html">motivations</RouterLink>.
      </p>
    </Box>
  </div>
);

const ToWho: React.FC = () => (
  <>
    <Title id="Public cible">À qui s'adresse Zétécom ?</Title>

    <p>
      Les zones de commentaires sont mises à disposition de tous, publiquement pour lire les messages, et après
      inscription pour participer aux échanges. Il n'est pas nécessaire de connaître par cœur les outils de la pensée
      critique, les biais cognitifs ou la méthode scientifique pour s'inscrire. Le but, c'est de rassembler des
      personnes qui « jouent le jeu », qui cherchent à <strong>partager leurs opinions</strong> et à{' '}
      <strong>comprendre celles des autres</strong>, avec bienveillance et humilité.
    </p>

    <p>
      Mais reconnaissons tout de même que cette initiative s'adresse en premier lieu à des personnes qui veulent
      décortiquer l'information, qui se posent des questions et cherchent des réponses via des échanges critiques. Si
      cette démarche vous correspond, si vous cherchez à renforcer votre autodéfense intellectuelle tout en exerçant
      votre esprit critique, alors vous avez beaucoup à apporter à la communauté. Vous pouvez montrer l'exemple, faire
      partie d'un groupe de personnes dans un but commun : celui de mieux comprendre le monde.
    </p>

    <p>
      Et si vous n'êtes pas familier avec les méthodes du scepticisme, ou ne cherchez pas spécialement à creuser
      l'information, cet outil vous permet de communiquer dans des conditions favorables, d'être écouté.e et corrigé.e
      pour de bonnes raisons. À terme, l'objectif est qu'autour des zones de commentaires Zétécom se développe une
      communauté dont l'intégrité ne peut être remise en question. Pour en faire partie, nous n'attendons rien de plus
      de votre part que le respect de la charte.
    </p>
  </>
);

const ExtensionApp: React.FC = () => (
  <div className="left-right extension-app">
    <div className="left extension">
      <div className="buttons">
        <DownloadExtension browser="chrome" />
        <DownloadExtension browser="firefox" />
      </div>
      <p>
        <strong>Installer l'extension</strong> permet à votre navigateur l'intégration des zones de commentaires Zétécom
        directement sur les sites d'information que vous visitez.
      </p>
    </div>

    <div className="separator" />

    <div className="right app">
      <div className="link">
        <AppLink className="app-button">Voir les zones de commentaires</AppLink>
      </div>
      <p>
        Si vous ne souhaitez pas passer par l'extension, les zones de commentaires sont aussi accessibles sur{' '}
        <strong>l'app</strong> à l'adresse <AppLink>{useEnvironment('APP_URL')}</AppLink>.
      </p>
    </div>
  </div>
);

const Home: React.FC = () => (
  <>
    <Box margin="big">
      <Heading />
    </Box>

    <Box margin="medium">
      <Video />
    </Box>

    <Box marginTop="medium">
      <Features />
    </Box>

    <hr className="separator" />

    <ExtensionApp />

    <Title id="points-cles">Les points clés</Title>

    <Box marginBottom="big">
      <KeyPoints />
    </Box>

    <Box margin="medium">
      <Why />
    </Box>

    <ToWho />
  </>
);

export default Home;
