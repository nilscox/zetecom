/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from 'src/components/Title';
import SubTitle from 'src/components/SubTitle';
import Link from 'src/components/Link';
import { useEnvironment } from 'src/utils/env';

import './Motivations.scss';

const Motivations: React.FC = () => (
  <>

    <Title id="motivations">Motivations</Title>

    <SubTitle id="contexte">Le contexte</SubTitle>

    <p>
      Sur internet, on peut lire toute sorte d'information.
      Entre les articles qui font l'éloge des dernières découvertes scientifiques, ceux qui mettent en garde contre le réchauffement climatique, qui expliquent pourquoi il faut sortir du nucléaire, ou l'inverse, que le nucléaire est l'énergie de l'avenir, en passant par les vidéos qui incitent à croire à des théories du complot ou qui « prouvent » l'existence de l'énergie libre !
      Malheureusement, la qualité des contenus présents sur le web n'est pas toujours au rendez-vous. <em>Mais à qui faire confiance ?</em>
    </p>

    <p>
      Face à cette abondance d'informations, il devient très difficile de faire la distinction entre celles qui sont sérieuses, qui reposent sur des faits solides, de celles qui ne le sont pas, voire qui sont fausses.
      Sans prendre le temps d'y réfléchir, on peut facilement accorder la même valeur au tweet d’un « expert » auto-proclamé qu'à une enquête journalistique effectuée par des professionnels.
      Avouons-le, il n'est pas toujours évident d'user de notre rationalité lorsque nous devons nous faire une opinion sur ce que les médias nous disent.
    </p>

    <p>
      Un sens critique affûté devient ainsi un atout primordial, qu'il est important de cultiver pour mieux comprendre l'information.
      Entre les différents conflits d'intérêts, la publicité déguisée, l'amalgame entre sciences et pseudosciences... En théorie, un média devrait informer son public de la manière la plus <em>neutre</em> possible, mais ce n'est pas ainsi que notre monde fonctionne en pratique.
      Pour se faire une opinion assez juste de l'information, il faut savoir raisonner avec un minimum d'esprit critique.
      Cela veut dire, par exemple, savoir suspendre son jugement, analyser correctement les faits en remontant à la source si nécessaire, estimer la validité des arguments ou encore avoir conscience des biais cognitifs pouvant compromettre un jugement.
    </p>

    <p>
      Mais élaborer une réflexion rationnelle seul peut se révéler difficile.
      Pour creuser un sujet, apporter des doutes lâ où cela semble nécessaire, il faut pouvoir <em>partager ses idées</em> avec des personnes à l'écoute, si possible dans un cadre propice à des échanges construits, argumentatifs et courtois.
      Ce n'est pas le but de la majorité des espaces de commentaires existants sur la toile, ceux-ci étant plutôt destinés à réagir <em>à chaud</em>, pour donner son ressenti sans trop réfléchir, allant parfois jusqu'à se faire prendre au piège à tenir une conversation hostile avec un bot, ou un troll.
    </p>

    <p>
      D'autres inconvénients existent avec les zones de commentaires, notamment sur YouTube. Elles ne sont pas présentes partout, ou peuvent être désactivées.
      Et lorsqu'elles existent, les fonctionnalités qu'elles apportent restent assez limitées : il est possible de commenter, parfois de répondre, mais rarement plus.
      Enfin, ces zones de commentaires sont souvent polluées par des messages destinés à faire rire ou à se moquer, voire violents.
      Par conséquent, des personnes qui auraient pu exposer un point de vue pertinent préfèrent se taire, de peur de se faire troller en retour.
      Ce contexte ne permet pas de construire une réflexion sérieuse.
    </p>

    <SubTitle id="objectifs">Les objectifs</SubTitle>

    <p>
      L'idée qui a fait naître Zétécom, c'est de proposer un espace d'échange basé sur <strong>la bienveillance</strong> et <strong>l'esprit critique</strong>, permettant de décortiquer l'information sur internet.
      Par exemple, cela peut être pour apporter une source qui remet en question l'information. Ou bien pour poser une question. Pour relever une incohérence dans un article, un biais méthodologique, ou un argument fallacieux. Ou encore, pour partager son opinion sur un sujet, et en discuter avec des personnes ayant un avis potentiellement différent.
    </p>

    <p>
      <em>Mais comment maintenir des échanges courtois et bienveillants ?</em> C'est un vrai challenge.
      À cela, deux points essentiels sont mis en place : <strong>la charte</strong> et <strong>la modération</strong>.
      La charte établie les limites de ce qui est acceptable ou non sur la plateforme, elle définit des règles simples, mais nécessaires pour garantir une bonne entente entre les utilisateurs.
      La modération quant à elle, est assurée par des personnes volontaires chargées de décider des actions à effectuer lorsqu'un message ne respecte pas la charte.
      A terme, l'objectif est d'arriver à une sorte d'auto-organisation, où chacun accepte de jouer le jeu pour en tirer des bénéfices communs.
    </p>

    <p>
      En son cœur, ce projet abrite des valeurs qui forgent la façon dont il est pensé et développé.
      Premièrement, à l'heure où attaques personnelles et procès d'intention sont monnaie courante sur les réseaux, il nous parait fondamental d'attribuer une place d'honneur au <strong>respect des personnes</strong>.
      Deuxièmement, nous pensons qu'un maximum de <strong>transparence</strong> est bénéfique pour l'évolution du projet, autant dans les motivations qui guident nos décisions, que dans le partage de l'intégralité de <Link openInNewTab href={useEnvironment('REPOSITORY_URL')}>son code source</Link>.
      Et troisièmement, nous voulons mettre en place un outil qui reste neutre, <strong>non partisan</strong>, n'étant ainsi rattaché à aucune norme politique ou idéologique.
    </p>

    <p style={{ marginTop: 32, fontSize: 13 }}>
      Cette page est en constante évolution : certains points seront détaillés / reformulés. N'hésitez pas à <Link href="/faq.html#contact">nous faire part</Link> de vos impressions !
    </p>

  </>
);

export default Motivations;
