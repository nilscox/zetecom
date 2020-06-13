/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';

import { Carousel } from 'react-responsive-carousel';

import Title from 'src/components/Title';
import Link from 'src/components/Link';
import Card from 'src/components/Card';
import DownloadExtensions from 'src/components/DownloadExtensionsButtons';

import imageCommunity from 'src/images/community.png';
import imageFakeNews from 'src/images/fake-news.png';
import imageTrust from 'src/images/trust.png';
import gifExtension from 'src/images/youtube-ri.gif';
import imageSearch from 'src/images/search.png';
import imageNestedReplies from 'src/images/nested-replies.png';
import imageSubscription from 'src/images/subscription.png';
import imageSortRelevance from 'src/images/sort-relevance.png';
import imageFormat from 'src/images/format.png';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.scss';

const Home: React.FC = () => (
  <>

    <div className="heading">
      <Link href="/"><em>Zétécom</em></Link>, c'est un <strong>espace d'échange collaboratif</strong>, pour discuter de l'information diffusée par les médias sur internet.
    </div>

    <Title id="Les objectifs">Les objectifs ?</Title>

    <div className="objectives">

      <Card text="Réunir une communauté de personnes pour réfléchir ensemble" image={imageCommunity}>
        Parce que les informations telles que présentées par les médias méritent d'être creusées
      </Card>

      <Card text="Lutter contre la propagation des fausses informations" image={imageFakeNews}>
        Parce que volontairement ou non, certaines informations ne reflètent pas la réalité
      </Card>

      <Card text="Offrir une place aux débats dans un climat de confiance sur la toile" image={imageTrust}>
        Parce qu'il n'est pas toujours facile de communiquer dans un contexte coopératif à travers un écran
      </Card>

    </div>

    <div className="why">

      <p>
        Depuis quelques dizaines d'années, les évolutions technologiques ont enclenché une vraie <Link openInNewTab href="https://fr.wikipedia.org/wiki/R%C3%A9volution_num%C3%A9rique">révolution</Link>, qui a radicalement bouleversé notre façon de communiquer <em>et de nous informer</em>.<br />
        En contrepartie, un nombre croissant de problématiques liées à l'information émergent, notamment dans la diffusion de celle-ci par les médias.
        Les articles relatant des faits hors du commun étant plus attrayants, les contenus sont parfois plus sensationnalistes que vrais.
      </p>

      <div className="separator" />

      <p>
        Mais avons-nous <strong>les bons outils</strong> pour réfléchir ensemble, intelligemment, face à cette abondance d'information ?<br />
        Zétécom a pour ambition d'apporter des solutions à ces problèmes, en proposant une plateforme qui <em>vous</em> permet de réagir aux médias sur internet, comme des articles de presse ou des vidéos sur YouTube.
      </p>

    </div>

    <Title id="Comment">Comment ?</Title>

    <div className="what-integration">

    <div className="integration-image">
        <img src={gifExtension} alt="extension Zétécom" />
      </div>

      <div className="integration-text">
        <div>
          Une exension chrome va <strong>intégrer</strong> des zones de commentaires sur les sites d'information que vous visitez.
        </div>
        <div>
          Ces commentaires doivent respecter <Link href="/charte.html">une charte</Link>, construite dans le but de favoriser des échanges argumentatifs et respectueux.
        </div>
      </div>

    </div>

    <Carousel
      autoPlay
      stopOnHover
      infiniteLoop
      transitionTime={640}
      interval={5500}
      showThumbs={false}
      showStatus={false}
      className="carousel"
    >
      <div className="carousel-slide">
        <div className="carousel-slide-legend">Recherche</div>
        <img src={imageSearch} alt="" />
      </div>
      <div className="carousel-slide">
        <div className="carousel-slide-legend">Réponses imbriquées</div>
        <img src={imageNestedReplies} alt="" />
      </div>
      <div className="carousel-slide">
        <div className="carousel-slide-legend">Messages pertinents mis en avant</div>
        <img src={imageSortRelevance} alt="" />
      </div>
      <div className="carousel-slide">
        <div className="carousel-slide-legend">Notifications</div>
        <img src={imageSubscription} alt="" />
      </div>
      <div className="carousel-slide">
        <div className="carousel-slide-legend">Messages structurés</div>
        <img src={imageFormat} alt="" />
      </div>
    </Carousel>

    <DownloadExtensions disposition="row" />

    <p>
      L'extension peut être utilisée pour lire les messages présents sur la plateforme sans avoir besoin de créer un compte.
      Pour en savoir plus, la page <Link href="/utilisation.html">utilisation</Link> présente quelques captures d'écran et explique comment fonctionne cet outil.
      Si vous souhaitez mieux comprendre le contexte dans lequel se place Zétécom, et les objectifs du projet, rendez-vous sur la page <Link href="/motivations.html">motivations</Link>.
    </p>

    <p>
      Nous tentons de rassembler sur cette plateforme, des personnes bienveillantes, attentives aux biais, qui savent écouter et partager leurs opinions, tout en gardant un œil critique face aux arguments qu'on leur présente. Prêt(e) à tenter l'expérience ?
    </p>

  </>
);

export default Home;
