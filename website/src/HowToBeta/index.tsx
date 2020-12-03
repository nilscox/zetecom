import React from 'react';
import ReactDOM from 'react-dom';

import logo from '../images/logo.png';

import 'fontsource-noticia-text/latin-400.css';
import 'fontsource-noticia-text/latin-700.css';

import 'fontsource-montserrat/latin-400.css';
import 'fontsource-montserrat/latin-600.css';

import './HowToBeta.scss'

const Header: React.FC = () => (
  <div className="header">
    <h1 className="beta-title">
      Zétécom - Test de la plateforme
    </h1>

    <img src={logo} className="logo" />

    <div className="title-container">
      <div className="title">Zétécom</div>
    </div>

    <div className="subtitle-container">
      <div className="subtitle subtitle-top">L'information</div>
      <div className="subtitle">avec esprit critique</div>
    </div>
  </div>
);

const HowToBeta: React.FC = () => (
  <div className="page">

    <Header />

    <p>
      En quelques dizaines d'années, la place de l'information et de sa diffusion par médias est devenu un enjeu incroyablement important au cœur de notre société.
      Il y a fort à parier que les problèmes liés aux fake news, aux conflits d'intérêts ou encore à la place de l'opinion dans les questions scientifiques ne feront qu'augmenter à l'avenir.
      Comment améliorer notre rapport à l'information ?
    </p>

    <p>
      Une approche accessible à tous est simplement d'en parler, d'échanger nos points de vue, d'expliquer les raisons pour lesquelles on pense ce que l'on pense.
      Si nous sommes en plus à l'écoute des arguments ayant convaincu d'autres personnes et de raisonner avec méthode, alors nous arriverons peut-être à mieux nuancer ce que nous disent les médias.
    </p>

    <p>
      Zétécom, c'est une initiative née dans le but de favoriser ce type de discussions sur internet, en proposant des espaces d'échanges cadrés par une charte.
      Tout est détaillé sur le site <a href="https://zetecom.fr">zetecom.fr</a> et la plateforme est accessible sur <a href="https://app.zetecom.fr">app.zetecom.fr</a>.
    </p>

    <p>
      Le projet en est à ses débuts, il n'y a pas encore de communauté active qui fait vivre les zones de commentaires.
      Nous cherchons des personnes qui s'interrogent par rapport à l'information sur internet, potentiellement intéressées pour participer aux premiers échanges sur la plateforme.
    </p>

    <p>
      Ce que nous vous proposons est simple : accédez à <a href="https://app.zetecom.fr">l'app</a> et naviguez à votre guise !
      Fouillez un peu partout, explorez, créez un compte, commentez, ouvrez de nouvelles zones de commentaires si vous le souhaitez, et prenez notes de vos premières impressions.
      Peut-être que vous trouverez l'interface agréable, que telle partie fait un peu vide, que tel texte devrait ressortir plus, qu'une formulation gagnerait à être retravaillée, etc.
    </p>

    <p>
      Certains points d'améliorations / bugs ont déjà été identifiés, nous nous attendons donc à ce qu'ils soient remontés.
      N'ayez pas peur de noter vos impressions en toute transparence.
    </p>

    <p>
      Pour objectiver vos retours, 3 formulaires de 5 questions vous seront proposés : tout de suite après la première utilisation, après une semaine d'utilisation, et après 2 mois d'utilisation.
      Vos réponses nous permettrons d'identifier les freins à l'utilisation de l'outil et de mieux orienter nos décisions pour l'avenir du projet.
    </p>

    <p>
      Si cette démarche vous intéresse, vous pouvez dès à présent tester l'outil et répondre au premier questionnaire (5 minutes), accessible ici : <a href="https://nilscoxdev.typeform.com/to/jsLZdej6">https://nilscoxdev.typeform.com/to/jsLZdej6</a>.
      Vous pouvez également nous contacter à l'adresse <a href="mailto:contact@zetecom.fr">contact@zetecom.fr</a> et nous retrouver sur discord : <a href="https://discord.gg/huwfqra">discord.gg/huwfqra</a>.
    </p>

    <p>
      À bientôt !
    </p>

  </div>
);

ReactDOM.render(<HowToBeta />, document.getElementById('app'));
