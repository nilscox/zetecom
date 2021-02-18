/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';

import { Carousel } from 'react-responsive-carousel';

import Title from 'src/components/Title';
import Link from 'src/components/Link';
import Card from 'src/components/Card';
import DownloadExtensions from 'src/components/DownloadExtensionsButtons';
import RouterLink from 'src/components/Link/RouterLink';

import gifExtension from '../../images/youtube-zc.gif';

import imageCommunity from './images/community.png';
import imageCharter from './images/charter.png';
import imageIndependence from './images/independence.png';
import imageSearch from './images/search.png';
import imageNestedReplies from './images/nested-replies.png';
import imageFormat from './images/format.gif';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.scss';

const Slide: React.FC<{ legend: string, image: string }> = ({ legend, image }) => (
  <div className="carousel-slide">
    <div className="carousel-slide-legend">{ legend }</div>
    <img src={image} alt={legend} />
    <div style={{ height: 40, background: 'white' }} />
  </div>
);

const Home: React.FC = () => (
  <>

    <div className="heading">
      <p>
        Zétécom, c'est une plateforme qui met à disposition des zones de commentaires, pour réagir à l'information sur internet tout en cultivant son <strong>autodéfense intellectuelle</strong>.
      </p>
      <p>
        Pour garantir des échanges constructifs, les personnes participant aux discussions s'engagent à respecter <RouterLink to="/charte.html">une charte</RouterLink> inspirée des principes de la pensée critique.
      </p>
    </div>

    <div className="why">
      <p>
        Depuis quelques dizaines d'années, la digitalisation des modes de communication a enclenché une vraie <Link href="https://fr.wikipedia.org/wiki/R%C3%A9volution_num%C3%A9rique">révolution</Link>, qui a radicalement bouleversé notre façon de nous informer.<br />
        Face à cela, de nouveaux problèmes liés à l'information émergent, notamment dans la manière dont elle est diffusée par les médias.
      </p>
      <div className="separator" />
      <p>
        Quels outils avons-nous à notre disposition pour réfléchir ensemble, pour analyser, décortiquer l'information présente sur internet ?<br />
        Le but de Zétécom est d'offrir la possibilité à tous d'ouvrir un dialogue sur des sujets d'actualité, avec des personnes à l'écoute et dans un carde propice à des échanges qui ont du sens.
      </p>
    </div>

    <Title id="Comment y arriver">Comment y arriver ?</Title>

    <div className="how">
      <Card primary="La communauté" image={imageCommunity}>
        Composée de personnes qui cherchent à discuter dans "de bonnes conditions", qui savent écouter tout en gardant un œil critique
      </Card>
      <Card primary="La charte" image={imageCharter}>
        Elle définit l'état d'esprit à adopter dans les conversations, apportant le filtre nécessaire pour garantir des échanges pertinents
      </Card>
      <Card primary="L'indépendance" image={imageIndependence}>
        Open-source et gratuit, Zétécom n'est lié à aucune autorité capable d'influer dans les commentaires d'une quelconque manière
      </Card>
    </div>

    <div className="need">
      <p>
        Vous est-il déjà arrivé de lire un commentaire qui apporte une réflexion poussée, détaillée et argumentée, un commentaire qui vous interpelle, vous fait réfléchir, voire peut-être même douter ?
        Avez-vous vous-même déjà pris le temps de rédiger un tel message, d'exprimer le fond de votre pensée en espérant trouver des personnes avec qui échanger sur un sujet qui vous tient à cœur ?
      </p>

      <p>
        Les espaces d'échanges classiques, sur YouTube par exemple, ne permettent pas de construire, d'organiser une discussion « sérieuse ».
        Les commentaires qui apportent une vraie plus-value se retrouvent souvent noyés autour de remerciements, de blagues, de trolls, d'opinions très tranchées sans la moindre source, etc. On peut faire mieux.
      </p>

      <p>
        Si cela vous intéresse, la page <RouterLink to="/motivations.html">motivations</RouterLink> explique plus en détail le contexte dans lequel s'inscrit Zétécom, les raisons pour lesquelles cet outil a vu le jour et les problématiques auxquelles il tente d'apporter des solutions.
      </p>
    </div>

    <Title id="Fonctionnalités">Plus que de simples zones de commentaires !</Title>

    <div className="features">

      <div className="features-text">
        <p>
          En plus de donner la possibilité d'échanger, Zétécom apporte quelques avantages par rapport aux espaces d'échanges classiques.
        </p>
        <p>
          <strong>Ouvrir une discussion n'importe où</strong>, et en particulier lorsque la zone de commentaires originale est fermée.
        </p>
        <p>
          <strong>Être notifié</strong> par exemple quand un message est publié en réponse à un commentaire que vous suivez.
        </p>
        <p>
          <strong>Rechercher parmi les messages existants</strong>, permettant ainsi de facilement repérer les commentaires qui parlent d'un sujet précis.
        </p>
        <p>
          <strong>Annoter les messages d'une réaction</strong> : plutôt d'accord, plutôt pas d'accord ou pas d'avis tranché. Cela permet de les qualifier et de les trier par pertinence.
        </p>
        <p>
          <strong>Intégrer les zones de commentaires</strong> sur les sites d'informations, via une extension disponible sur Chrome et Firefox.
        </p>
        <p>
          Et plus à venir ! Et encore plus grâce à vous !
          Si vous avez des idées à proposer ou si vous souhaitez tester les nouvelles fonctionnalités en avant première, <RouterLink to="/beta.html">rejoignez les bêta-testeurs</RouterLink> ;)
        </p>
      </div>

      <Carousel
        autoPlay
        stopOnHover
        infiniteLoop
        transitionTime={620}
        interval={8000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        className="carousel"
      >
        <Slide legend="Recherche" image={imageSearch} />
        <Slide legend="Réponses imbriquées" image={imageNestedReplies} />
        <Slide legend="Messages structurés" image={imageFormat} />
      </Carousel>

    </div>

    <hr className="separator" />

    <div className="extension">

      <img className="extension-image" src={gifExtension} alt="extension Zétécom" />

      <div className="extension-text">
        <p>
          Avec l'extension, <strong>intégrez</strong> les zones de commentaires Zétécom sur les sites que vous visitez.<br />
          Pas besoin de chercher plus loin.
        </p>
        <DownloadExtensions disposition="row" />
      </div>
    </div>

    <div className="after-extension">
      <DownloadExtensions disposition="row" />
    </div>

    <Title id="Public cible">À qui s'adresse Zétécom ?</Title>

    <p>
      Les zones de commentaires sont mis à disposition de tous, publiquement pour lire les messages, et après inscription pour participer aux échanges.
      Il n'est pas nécessaire de connaître par cœur les outils de la pensée critique, les biais cognitifs ou la méthode scientifique pour s'inscrire.
      Le but, c'est de rassembler des personnes qui « jouent le jeu », qui cherchent à <strong>partager leurs opinions</strong> et à <strong>comprendre celles des autres</strong>, avec bienveillance et humilité.
    </p>

    <p>
      Mais reconnaissons tout de même que cette initiative s'adresse en premier lieu à des personnes qui veulent décortiquer l'information, qui se posent des questions et cherchent des réponses via des échanges critiques.
      Si cette démarche vous correspond, si vous cherchez à renforcer votre autodéfense intellectuelle tout en exerçant votre esprit critique, alors vous avez beaucoup à apporter à la communauté.
      Vous avez le pouvoir de montrer l'exemple, d'être le moteur d'un groupe de personnes dans un but commun.
    </p>

    <p>
      Et si vous ne cherchez pas spécialement à creuser l'information ou que vous n'êtes pas familier avec les méthodes du scepticisme, cet outil vous permet simplement de communiquer dans des conditions favorables, d'être écouté et corrigé pour de bonnes raisons.
      À terme, l'objectif est qu'autour de cet outil se développe une communauté dont l'intégrité ne peut être remise en question.
      Pour en faire partie, nous n'attendons rien de plus de votre part que le respect de la charte.
    </p>

  </>
);

export default Home;
