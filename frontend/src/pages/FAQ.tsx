/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import env from 'src/utils/env';
import Box from 'src/components/common/Box';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Tlkio from './components/Tlkio';

/* eslint-disable max-len */

const questions = [
  {
    question: 'Comment créer un compte sur Réaciton à l\'information ?',
    answer: (
      <>
        Le projet étant en phase de test, l'inscription n'est pas encore ouverte à tous pour l'instant. Si vous
        souhaitez faire partie des testeurs, vous pouvez <a href="#contact">contacter</a> l'équipe qui développe
        le projet.
      </>
    ),
  },

  {
    question: 'Où trouver la liste des zones de commentaires disponibles avec l\'extension ?',
    answer: (
      <>
        Pour le moment, il n\'est pas possible de lister les pages contenant une zone de commentaire propre à la
        platforme.
      </>
    ),
  },

  {
    question: 'Comment créer une nouvelle zone de commentaires ?',
    answer: (
      <>
        Il est nécéssaire de <a href="#contact">contacter</a> l'équipe qui développe le projet pour demander l'ajout
        d'une nouvelle zone de commentaire.
      </>
    ),
  },

  {
    question: 'Comment mettre en page une réaction ?',
    answer: (
      <>
        Les messages peuvent être rédigées en <a href="https://fr.wikipedia.org/wiki/Markdown">markdown</a>, un langage
        de balisage permettant une mise en forme simple.
      </>
    ),
  },

  {
    question: 'Comment est assurée la modération ?',
    answer: 'Les messages signalés sont traités par des membres volontaires de la communauté.',
  },

  {
    question: 'Qui peut devenir modérateur ?',
    answer: (
      <>
        Tous les membres de la communauté ! Si vous êtes motivé(e), <a href="#contact">contactez</a> l'équipe qui
        développe le projet pour expliquer les raisons qui motivent ce choix, nous en discuterons directement.
      </>
    ),
  },

  {
    question: 'Comment supprimer un compte de la platforme ?',
    answer: (
      <>
        Il est possible de supprimer un compte en <a href="#contact">contactant</a> l'équipe qui développe
        le projet par email, depuis l'adresse associée au compte à supprimer.
      </>
    ),
  },

  {
    question: 'Comment modifier le mot de passe d\'un compte ?',
    answer: (
      <>
        Pour modifier le mot de passe d'un compte, cliquez sur le lien "mot de passe oublié" accessible via la popup de
        l'extension lorsque vous n'êtes pas connecté.
      </>
    ),
  },

  {
    question: 'Comment remonter un bug ou proposer de nouvelles fonctionnalités ?',
    answer: (
      <>
        Vous l'aurez peut-être deviné, <a href="#contact">contactez</a> l'équipe qui développe le projet.
      </>
    ),
  },

  {
    question: 'Comment le projet est-il financé ?',
    answer: 'Le but du projet n\'est pas de faire de l\'argent, et aucun financement n\'est en jeu.',
  },

  {
    question: 'Qui développe Réagir à l\'information ?',
    answer: (
      <>
        Le projet est développé par une <a href="https://nils.cx">petite</a> <a href="https://bopzor.me">équipe</a> de
        développeurs passionnés d'esprit critique et de zététique.
      </>
    ),
  },

  {
    question: 'Peut-on participer au projet',
    answer: (
      <>
        Si vous souhaitez participer au projet, pour donner des feedbacks ou proposer des axes d'amélioration, vous êtes
        invité(e) à <a href="#contact">contactez</a> l'équipe qui développe le projet pour en discuter. Et si vous êtes
        développeurs et que le projet vous intéresse techniquement, les source sont disponibles sur{' '}
        <a href={env.GITHUB_REPO_URL}>github</a>.
      </>
    ),
  },

  {
    question: 'Votre question ne figure pas dans cette liste... ?',
    answer: <><a href="#contact">Contactez</a> l'équipe qui développe le projet !</>,
  },
];

/* eslint-enable max-len */

type QuestionProps = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

const Question: React.FC<QuestionProps> = ({ question, answer }) => (
  <Box my={12}>
    <strong>{ question }</strong>
    <p>{ answer }</p>
  </Box>
);

const Questions: React.FC = () => (
  <>
    { questions.map((props, n) => <Question key={n} {...props} />) }
  </>
);

const Contact = () => (
  <>
    <SubTitle id="contact">Une idée à proposer ? Un bug à remonter ?</SubTitle>

    <p>L'équipe à l'origine de Réagir à l'information est à l'écoute via ces différents canaux de communication :</p>

    <ul>
      <li>Par email, à l'adresse <a href="mailto:reaction-information@nils.cx">reaction-information@nils.cx</a></li>
      <li>Sur twitter, via le compte de <a href="https://twitter.com/NilsCox">@NilsCox</a></li>
      <li>
        Par chat, via <a href="https://tlk.io/reaction-information" target="_blank" rel="noopener noreferrer">tlk.io</a>
      </li>
    </ul>

    <SubTitle id="chat">Chat en direct</SubTitle>

    <Tlkio />

  </>
);

const FAQ: React.FC = () => {
  return (
    <>

      <Title id="faq">Questions posées fréquemment</Title>

      <Questions />
      <Contact />

    </>
  );
};

export default FAQ;
