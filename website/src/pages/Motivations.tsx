/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from 'src/components/Title';
import SubTitle from 'src/components/SubTitle';
import Link from 'src/components/Link';
import { useEnvironment } from 'src/index';

import './Motivations.scss';

const Motivations: React.FC = () => (
  <>

    <Title id="motivations">Motivations</Title>

    <p>
      Cette page décrit plus en détail les raisons pour lesquelles ce projet a vu le jour, et les problématiques auxquelles il tente d'apporter des solutions.
    </p>

    <SubTitle id="contexte">Le contexte</SubTitle>

    <p>
      Sur internet, on peut lire toute sorte d'information.
      Entre les articles qui font l'éloge des dernières découvertes scientifiques, ceux qui mettent en garde contre le réchauffement climatique, qui expliquent pourquoi il faut sortir du nucléaire, ou l'inverse, que le nucléaire est l'énergie de l'avenir, sans oublier les vidéos qui incitent à croire à des théories du complot ou qui prouvent l'existence de l'énergie libre !
      Malheureusement, <strong>la qualité des contenus</strong> présents sur le web n'est pas toujours au rendez-vous. <em>Mais à qui faire confiance ?</em>
    </p>

    <p>
      Face à cette abondance d'informations, il devient très difficile, parfois même impossible, de faire la distinction entre celles qui sont sérieuses, qui reposent sur des faits solides, de celles qui ne le sont pas, voire qui sont fausses.
      Sans prendre le temps d'y réfléchir, on peut facilement accorder la même valeur au tweet d’un « expert » auto-proclamé qu'à une enquête journalistique effectuée par des professionnels.
      Et bien souvent, ce n'est pas notre <strong>rationalité</strong> que nous utilisons pour nous faire une opinion sur ce que nous apprennent les médias.
    </p>

    <p>
      Un sens critique affûté devient ainsi un atout primordial, que chaque internaute cherchant à comprendre l'information se doit de cultiver.
      Entre les différents conflits d'intérêts, la publicité déguisée, le manque de rigueur de certains journalistes, l'addiction au buzz... Le but des médias n'est pas toujours d'<em>informer</em> son public de la manière la plus <em>neutre</em> possible.
      Pour se faire une opinion <em>assez juste</em> de l'information, il faut savoir raisonner avec un minimum d'esprit critique.
      Cela veut dire, par exemple, savoir suspendre son jugement, analyser correctement les faits en remontant à la source si nécessaire, estimer la validité des arguments ou encore avoir conscience des biais cognitifs pouvant compromettre un jugement.
    </p>

    <p>
      Mais élaborer une réflexion rationnelle seul peut se révéler difficile.
      Pour approfondir un sujet ou mettre les choses en perspective, le mieux reste de <strong>partager ses idées</strong> avec des personnes à l'écoute, si possible dans un cadre propice à des échanges construits, argumentatifs et courtois.
      Ce n'est pas le but de la majorité des espaces de commentaires existants sur la toile, ceux-ci étant plutôt destinés à réagir <em>à chaud</em>, pour donner son ressenti sans trop réfléchir.
    </p>

    <p>
      D'autres inconvénients existent avec les zones de commentaires, notamment sur YouTube. Elles ne sont pas présentent partout, ou peuvent être désactivées.
      Et lorsqu'elles existent, les possibilités qu'elles apportent restent assez limitées : il est possible de commenter, parfois de répondre, mais rarement plus.
      Enfin, ces zones de commentaires sont souvent polluées par des messages destinés à faire rire ou à se moquer, voire violents. Face à cela, des personnes qui auraient pu exposer un point de vue pertinent préfèrent se taire, de peur de se faire <em>troller</em> en retour.
      Ce contexte ne permet pas de construire une réflexion sérieuse.
    </p>

    <SubTitle id="objectifs">Les objectifs</SubTitle>

    <p>
      L'idée qui a fait naître Réagir à l'information, c'est de proposer un espace d'échange basé sur <strong>la bienveillance</strong> et <strong>l'esprit critique</strong>, pour discuter de l'information sur internet.
      Par exemple, cela peut être pour apporter une source qui remet en question l'information. Ou bien pour poser une question. Pour relever une incohérence dans un article, un biais méthodologique, ou un argument fallacieux. Ou encore, pour partager son opinion sur un sujet, et en discuter avec des personnes ayant un avis différent.
    </p>

    <p>
      En plus d'induire cet état d'esprit dans les échanges, le projet apporte quelques fonctionnalités qui le démarque d'une zone de commentaire « classique ».
      Comme illustré en page d'accueil, il y a une fonction de recherche dans les commentaires, la possibilité de trier les messages par pertinence, de recevoir des notifications quand une réponse est publiée, ou encore de mettre en forme le texte.
      De plus, l'extension permet d'intégrer ces zones de commentaires à l'intérieur des sites sur lesquels se trouve l'information, à la fin de l'article ou sous la vidéo sur YouTube. Pas besoin d'aller chercher ailleurs.
      Autre avantage non négligeable, cela offre la possibilité d'ouvrir une zone de commentaire là où il n'y en a pas, ou lorsqu'elle est désactivée.
    </p>

    <p>
      <em>Mais comment maintenir des échanges courtois et bienveillants ?</em> C'est un vrai challenge.
      À cela, deux points essentiels sont mis en place : <strong>la charte</strong> et <strong>la modération</strong>.
      La charte établie les limites de ce qui est acceptable ou non sur la plateforme, elle définit des règles simples, mais nécessaires pour garantir une bonne entente entre les utilisateurs.
      La modération quant à elle, est assurée par des personnes volontaires, chargées de décider des actions à effectuer lorsqu'un message ne respecte pas la charte, via une interface dédiée.
    </p>

    <p>
      En son cœur, le projet abrite des valeurs qui forgent la façon dont il est pensé et développé.
      Premièrement, à l'heure où attaques personnelles et procès d'intention sont monnaie courante sur les réseaux, il nous parait fondamental d'attribuer une place d'honneur au <strong>respect des personnes</strong>.
      Secondement, nous pensons qu'un maximum de <strong>transparence</strong> est bénéfique pour l'évolution du projet, autant dans les motivations qui guident nos décisions, que dans le partage de l'intégralité du <Link openInNewTab href={useEnvironment('REPOSITORY_URL')}>code source du produit</Link>.
      Enfin, nous voulons mettre en place un outil qui reste neutre, <strong>non partisan</strong>, c'est-à-dire qui n'est rattaché à aucune norme politique ou idéologique.
    </p>

  </>
);

export default Motivations;
