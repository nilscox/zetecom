/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import { useEnvironment } from 'src/index';
import Title from 'src/components/Title';

/*

*plus ou moins en vrac*

- Scope : vision long terme, scope actuel (YouTube)
- définition de l'information dans le cadre de CDV

- Contextualisation de l'information sur internet
  - disponibilité / accessibilité de l'information
  - qualité de l'information
  - désinformation, fake news, fact checking
  - manque d'organisation

- problématiques liés à l'information
  - surinformation / infobésité
  - qualité de l'information
  - désinformation
  - fake news / junk news
  - publi-information
  - manque de rigueur des médias
  - addiction au buzz, aux contenus sensationnalistes
  - biais et arguments fallacieux
  - manque de possibilité de réagir
  - manque d'organisation / modération
  - manque de bienveillance, d'ouverture d'esprit
  - manque d'esprit critique, de méthode
  - débat stériles / débat sémantique (dispute verbale)

- réponses à ces problématiques
  - non partisan
  - la charte
    - respect des autres
    - empêche les messages vides de sens
    - pousse à comprendre les opinions sans préjugés
  - réponses nestées
  - référencement des réactions
  - modération
  - transparence
  - Non partisan : aucune affiliation envers quelque entité que ce soit

- État d'esprit du projet
  - communauté, charte, algo de référencement
  - open source
  - projet participatif
  - vision long terme, idées futures

*/

const Motivations: React.FC = () => {
  const REPOSITORY_URL = useEnvironment('REPOSITORY_URL');

  return (
    <>

      <em style={{ margin: '30px 0' }}>
        Cette page décrit plus en détail les raisons pour lesquelles ce projet a vu le jour, et les problématiques
        auxquelles le projet tente d'apporter des solutions. Mais... elle est en cours de rédaction ! Revenez vite :)
      </em>

      <p className="hide">
        Il existe sur internet, un grand nombre d'informations dont la qualité peut varier du tout au tout. Et
        particulièrement sur YouTube, on trouve aussi bien des reportages très qualitatif sur le monde, l'espace, les
        dernières découvertes scientifiques, que des vidéos relatant de fausses informations, ou incitant à croire à
        des théories complotistes. Et inévitablement, l'espace d'échanges prévu pour discuter sous la vidéo se
        retrouve facilement inondé de commentaires dont le but n'est pas de donner son opinion sur le sujet, et des
        réflexions tout à fait pertinentes se retrouvent noyées. Et c'est normal&nbsp;! La zone de commentaire YouTube
        n'est pas vraiment prévue pour ça.
      </p>

      <p className="hide">
        CDV a été imaginé dans le but de rassembler une communauté de personnes qui se mettent d'accord pour respecter
        un ensemble de règles, inspirées de principes septiques, qui donnent un cadre clair aux réflexions pouvant
        émerger en réaction aux informations sur internet. Les "réactions" (les commentaires sur CDV) peuvent être
        rédigées en réponse à d'autres, les plus impactantes étant mises en avant. Un peu comme sur reddit pour les
        connaisseurs. Prêt(e) à tenter l'expérience ? Jetez un œil à <a href="/charte">la charte</a> ;)
      </p>

      <div className="hide">
        <Title id="Des idées sur le projet">Des idées sur le projet ?</Title>
      </div>

      <p className="hide">
        CDV est pensé dans un but collaboratif au niveau du contenu rédigé par les utilisateurs, mais aussi au niveau
        de son fonctionnement. Dans un but d'amélioration progressive des idées, de la charte, et de l'état d'esprit
        du projet en général, les intéressés sont invité à <a href="/faq#contact">en discuter</a> avec l'équipe qui
        développe la plateforme. Et s'il y a des amis développeurs parmi vous, toutes les sources du projet sont
        accessibles sur <a href={REPOSITORY_URL}>github</a>. Issues and pull requests are very welcome :)
      </p>

      <p className="hide">
        La boîte à suggestions est ouverte ! Pour l'instant, il est par exemple envisagé d'intégrer CDV sur d'autres
        sites d'informations, de mettre en place une interface de modération par la communauté, d'améliorer
        l'algorithme de référencement... Bientôt, vous pourrez vous aussi proposer des idées d'améliorations ainsi que
        remonter d'éventuels bugs.
      </p>

      <p className="hide">
        Pour en savoir un peu plus sur les idées et valeurs qui forgent CDV, vous trouverez des informations un peu
        plus détaillées sur la page <a href="/motivations">motivations</a>. Restons à l'écoute, développons notre esprit
        critique, et... cherchons la vérité !
      </p>

    </>
  );
};

export default Motivations;
