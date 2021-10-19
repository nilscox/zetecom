/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from 'src/components/Title';
import SubTitle from 'src/components/SubTitle';
import Link from 'src/components/Link';
import RouterLink from 'src/components/Link/RouterLink';
import { useEnvironment } from 'src/utils/env';

import './Motivations.scss';

// prettier-ignore
const Motivations: React.FC = () => (
  <>

    <Title id="motivations">Motivations</Title>

    <SubTitle id="contexte">Le contexte</SubTitle>

    <p>
      Sur internet, on peut lire toute sorte d'information.
      Entre les articles qui font l'éloge des dernières découvertes scientifiques, qui mettent en garde contre le réchauffement climatique, qui expliquent pourquoi il faut sortir du nucléaire, ou au contraire, que le nucléaire est l'énergie de l'avenir, en passant par les vidéos qui « prouvent » l'existence de l'énergie libre ou qui « démontrent » qu'il existe un complot mondial !
      Malheureusement, la qualité des contenus présents sur le web n'est pas toujours au rendez-vous. <em>Mais à qui faire confiance ?</em>
    </p>

    <p>
      Face à cette abondance d'informations, il est difficile de faire la distinction entre celles qui sont sérieuses, qui reposent sur des faits solides et vérifiés, de celles qui ne le sont pas, voire qui sont fausses.
      Sans prendre le temps d'y réfléchir, on peut facilement accorder autant de valeur au tweet d’un « expert » auto-proclamé qu'à une enquête journalistique effectuée par des professionnels.
      Force est de constater qu'il n'est pas toujours évident d'user de notre rationalité lorsque nous devons nous faire une opinion sur ce que les médias nous disent, et plus particulièrement sur les sujets qui nous tiennent à cœur.
    </p>

    <p>
      Un sens critique affûté devient ainsi un atout primordial, qu'il est important de cultiver pour mieux comprendre l'information.
      Entre conflits d'intérêts, motivations politiques, publicité déguisée, amalgame entre sciences et pseudosciences... Un média devrait informer son public de manière <em>neutre</em> en théorie, mais ce n'est pas ainsi que fonctionne notre monde en pratique.
      Pour se faire une opinion assez juste de l'information, il faut savoir raisonner avec un minimum d'esprit critique.
      Cela veut dire, par exemple, faire attention aux incohérences dans un graphique, bien comprendre des faits en remontant à la source si nécessaire, estimer la validité des arguments en laissant de côté ses a priori ou encore avoir conscience des biais cognitifs pouvant altérer notre compréhension.
    </p>

    <p>
      Mais élaborer une réflexion rationnelle seul peut se révéler difficile.
      Pour creuser un sujet, apporter des doutes lorsque c'est nécessaire, il faut pouvoir <em>partager ses idées</em> avec des personnes à l'écoute, si possible dans un cadre propice à des échanges construits et argumentés.
      Ce n'est pas le but des des espaces de commentaires existants sur la toile, ceux-ci étant plutôt destinés à réagir <em>à chaud</em>, pour donner son ressenti sans forcément prendre le temps de réfléchir, allant parfois jusqu'à se faire prendre au piège à tenir une conversation hostile contre un « troll ».
    </p>

    <p>
      Ces zones de commentaires « traditionnelles » ont d'autres inconvénients.
      D'un côté, elles ne sont pas disponibles sur toutes les plateformes d'information, et même quand elles existent, il est souvent possible de les désactiver.
      Mais aussi, les fonctionnalités qu'elles apportent restent assez limitées : il est possible de commenter, de répondre, parfois d'ajouter une mention « j'aime », mais rarement plus.
      Il arrive également que ces zones de commentaires soient polluées par des messages destinés à faire rire ou à se moquer, et même parfois violents.
      Par conséquent, des personnes qui auraient pu exposer un point de vue pertinent préfèrent se taire, de peur de se faire troller en retour.
    </p>

    <p>
      Ce contexte ne permet pas de construire de réflexions sérieuses.
    </p>

    <SubTitle id="objectifs">Les objectifs</SubTitle>

    <p>
      L'idée qui a fait naître Zétécom, c'est de proposer un espace d'échange permettant de décortiquer l'information sur internet, basé sur <strong>la bienveillance</strong> et <strong>l'esprit critique</strong>.
      Par exemple, cela peut être pour apporter une source qui remet en question l'information. Ou bien pour poser une question. Pour relever une incohérence dans un article, un biais méthodologique, ou un argument fallacieux. Ou encore, pour partager son opinion sur un sujet, et en discuter avec des personnes ayant un avis potentiellement différent.
    </p>

    <p>
      <em>Mais comment assurer des échanges constructifs ?</em> C'est un vrai challenge.
      Pour cela, les deux points essentiels sont : <strong>la charte</strong> et <strong>la modération</strong>.
    </p>

    <p>
      La charte établie les limites de ce qui est acceptable ou non sur la plateforme. Elle définit quelques règles simples, mais nécessaires pour garantir une bonne entente entre les utilisateurs.
      La modération quant à elle, est assurée par des personnes volontaires chargées de décider des actions à effectuer lorsqu'un message ne respecte pas la charte.
      A terme, l'objectif est d'arriver à une sorte d'auto-organisation décentralisée, où l'intégrité de la communauté ne peut être remise en question.
    </p>

    <p>
      En son cœur, ce projet abrite des valeurs qui forgent la façon dont il est mis en place.
      Premièrement, à l'heure où attaques personnelles et procès d'intention sont monnaie courante sur les réseaux, il nous parait fondamental d'attribuer une place d'honneur au <strong>respect des personnes</strong>.
      Deuxièmement, nous pensons qu'un maximum de <strong>transparence</strong> est bénéfique pour l'évolution du projet, autant dans les motivations qui guident nos décisions, que dans le partage de l'intégralité de <Link href={useEnvironment('REPOSITORY_URL')}>son code source</Link>.
      Et troisièmement, nous voulons mettre en place un outil qui reste neutre, <strong>non partisan</strong>, n'étant ainsi rattaché à aucune norme politique ou idéologique.
    </p>

    <p style={{ marginTop: 32, fontSize: 13 }}>
      Cette page est en constante évolution : certains points seront détaillés / reformulés. N'hésitez pas à <RouterLink to="/faq.html#contact">nous faire part</RouterLink> de vos impressions !
    </p>

  </>
);

export default Motivations;
