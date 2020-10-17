/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';

import { Carousel } from 'react-responsive-carousel';

import Title from 'src/components/Title';
import Link from 'src/components/Link';
import Card from 'src/components/Card';
import DownloadExtensions from 'src/components/DownloadExtensionsButtons';

import gifExtension from '../../images/youtube-zc.gif';

import imageCommunity from './images/community.png';
import imageFakeNews from './images/fake-news.png';
import imageTrust from './images/trust.png';
import imageSearch from './images/search.png';
import imageNestedReplies from './images/nested-replies.png';
import imageSubscription from './images/subscription.png';
import imageSortRelevance from './images/sort-relevance.png';
import imageFormat from './images/format.png';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.scss';

const Slide: React.FC<{ legend: string, image: string, alt?: string }> = ({ legend, image, alt }) => (
  <div className="carousel-slide">
    <div className="carousel-slide-legend">{ legend }</div>
    <img src={image} alt={alt} />
    <div style={{ height: 40, background: 'white' }} />
  </div>
);

const Home: React.FC = () => (
  <>

    <div className="heading">
      <Link href="/"><em>Zétécom</em></Link>, ce sont des <strong>espaces d'échange collaboratifs</strong>, pour discuter de l'information diffusée par les médias sur internet, tout en cultivant son esprit critique.
    </div>

    <Title id="Les objectifs">Les objectifs ?</Title>

    <div className="objectives">

      <Card text="Réunir une communauté de personnes pour réfléchir ensemble" image={imageCommunity}>
        Parce qu'il est nécessaire de construire une vrai réflexion pour mieux comprendre l'information
      </Card>

      <Card text="Lutter contre la propagation des fausses informations" image={imageFakeNews}>
        Parce que les faits telles que présentés par les médias ne reflètent pas toujours la réalité
      </Card>

      <Card text="Offrir une place aux débats dans un climat de confiance sur la toile" image={imageTrust}>
        Parce qu'il n'est pas évident de communiquer dans un contexte coopératif à travers un écran
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
          Une extension permet à votre navigateur d'<strong>intégrer</strong> les zones de commentaires Zétécom sur les sites que vous visitez.
        </div>
        <div>
          Ces commentaires doivent respecter <Link href="/charte.html">une charte</Link>, construite dans le but de favoriser des échanges argumentatifs et respectueux.
        </div>
      </div>

    </div>

    <div className="spacer" />

    <div className="branding">

      <DownloadExtensions disposition="column" />

      <Carousel
        autoPlay
        stopOnHover
        infiniteLoop
        transitionTime={620}
        interval={4200}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        className="carousel"
      >
        <Slide legend="Recherche" image={imageSearch} alt="recherche" />
        <Slide legend="Réponses imbriquées" image={imageNestedReplies} alt="réponses imbriquées" />
        <Slide legend="Messages pertinents mis en avant" image={imageSortRelevance} alt="tri par pertinence" />
        <Slide legend="Notifications" image={imageSubscription} alt="notifications" />
        <Slide legend="Messages structurés" image={imageFormat} alt="messages structurés" />
      </Carousel>

    </div>

    <p>
      Pour en savoir plus, jetez un œil à la page <strong><Link href="/utilisation.html">utilisation</Link></strong>, qui explique un peu plus en détail ce que propose l'extension.
      Et si vous souhaitez mieux comprendre le contexte dans lequel se place Zétécom et ses ambitions, rendez-vous sur la page <strong><Link href="/motivations.html">motivations</Link></strong>.
    </p>

    <Title id="Pour-qui">Pour qui ?</Title>

    <p>
      Les espaces de commentaires Zétécom sont mis à disposition de tous, publiquement pour lire les messages, et après inscription pour participer aux échanges.
      Il n'est pas nécessaire de connaître par cœur les outils de la pensée critique, les biais cognitifs ou la méthode scientifique pour s'inscrire.
      Le but, c'est de rassembler des personnes qui « jouent le jeu », qui cherchent à <em>partager leurs opinions</em> et à <em>comprendre celles des autres</em>, avec bienveillance et humilité.
    </p>

    <p>
      Ah, un dernier mot : le projet est actuellement (octobre 2020) en phase de test, et il n'y a pas encore de zones de commentaires ouvertes sur l'extension.
      Cependant, si vous appréciez la démarche et que vous avez envie de participer au lancement du projet, la page <strong><Link href="/beta.html">bêta</Link></strong> donne tout ce qu'il faut savoir pour devenir bêta-testeur !
      Vos retours nous permettrons de mieux comprendre vos attentes, et donc de mieux répondre à vos besoins.<br />
      À bientôt !
    </p>

  </>
);

export default Home;
