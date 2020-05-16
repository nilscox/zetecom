/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';

import Title from 'src/components/Title';
import Link from 'src/components/Link';
import Card from 'src/components/Card';
import DownloadExtensions from 'src/components/DownloadExtensions';

import imageCommunity from 'src/images/community.png';
import imageFakeNews from 'src/images/fake-news.png';
import imageTrust from 'src/images/trust.png';
import gifExtension from 'src/images/youtube-ri.gif';
import imageSearch from 'src/images/search.png';
import imageNestedReplies from 'src/images/nested-replies.png';
import imageSubscription from 'src/images/subscription.png';
import imageSortRelevance from 'src/images/sort-relevance.png';
import imageFormat from 'src/images/format.png';

import './Home.scss';
import Carousel from 'src/components/Carousel';

const Home: React.FC = () => (
  <>

    <div className="heading">
      <Link href="/"><em>Réagir à l'information</em></Link>, c'est un <strong>espace d'échange collaboratif</strong>, pour discuter de l'information diffusée par les médias sur internet.
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

    <Title id="Pourquoi">Pourquoi ?</Title>

    <div className="why">

      <p>
        Depuis quelques dizaines d'années, les évolutions technologiques ont enclenché une vraie <Link openInNewTab href="https://fr.wikipedia.org/wiki/R%C3%A9volution_num%C3%A9rique">révolution</Link>, qui a radicalement bouleversé notre façon de communiquer <em>et de nous informer</em>.<br />
        En contrepartie, un nombre croissant de problématiques liées à l'information émergent, notamment dans la diffusion de celle-ci par les médias.
        Les articles relatant des faits hors du commun étant plus attrayants, les contenus sont parfois plus sensationnalistes que vrais.
      </p>

      <div className="separator" />

      <p>
        Mais avons-nous <strong>les bons outils</strong> pour réfléchir ensemble, intelligemment, face à cette abondance d'information ?<br />
        Réagir à l'information a pour ambition d'apporter des solutions à ces problèmes, en proposant une plateforme qui <em>vous</em> permet de réagir aux médias sur internet, comme des articles de presse ou des vidéos sur YouTube.
      </p>

    </div>

    <Title id="Comment">Comment ?</Title>

    <div className="what-integration">

      <div className="integration-text">
        <h3>
          Une exension chrome va <strong>intégrer</strong> des zones de commentaires sur les sites d'information que vous visitez.
        </h3>
        <h3>
          Ces commentaires doivent respecter <Link href="/charte.html">une charte</Link>, construite dans le but de favoriser des échanges argumentatifs et respectueux.
        </h3>
      </div>

      <div className="integration-image">
        <img src={gifExtension} alt="extension réagir à l'information" />
      </div>

    </div>

    <Carousel
      delay={7000}
      slides={[
        { text: 'Recherche', image: imageSearch },
        { text: 'Réponses imbriquées', image: imageNestedReplies },
        { text: 'Messages pertinents mis en avant', image: imageSortRelevance },
        { text: 'Notifications', image: imageSubscription },
        { text: 'Messages structurés', image: imageFormat },
      ]}
    />

    <DownloadExtensions disposition="row" />

    <p>
      L'extension peut être utilisée pour lire les messages présents sur la plateforme sans avoir besoin de créer un compte.
      Pour en savoir plus, la page <Link href="/utilisation.html">utilisation</Link> présente quelques captures d'écran et explique comment fonctionne cet outil.
      Si vous souhaitez mieux comprendre le contexte dans lequel se place Réagir à l'information, et les objectifs du projet, rendez-vous sur la page <Link href="/motivations.html">motivations</Link>.
    </p>

    <p>
      Nous tentons de rassembler sur cette plateforme, des personnes bienveillantes, attentives aux biais, qui savent écouter et partager leurs opinions, tout en gardant un œil critique face aux arguments qu'on leur présente. Prêt(e) à tenter l'expérience ?
    </p>

  </>
);

export default Home;
