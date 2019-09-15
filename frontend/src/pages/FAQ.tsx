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
    question: 'Comment créer un compte sur CDV ?',
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
    answer: 'Pour le moment, il n\'est pas possible de lister les pages contenant une zone de commentaire CDV.',
  },
  {
    question: 'Comment créer une nouvelle zone de commentaires ?',
    answer: (
      <>
        Il est nécéssaire de <a href="#contact">contacter</a> l'équaoeaeipe qui développe le projet pour demander
        l'ajout d'une nouvelle zone de commentaire.
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
    question: 'Comment supprimer un compte sur CDV ?',
    answer: (
      <>
        Il est possible de supprimer un compte en <a href="#contact">contactant</a> l'équipe qui développe
        le projet.
      </>
    ),
  },
  {
    question: 'Comment modifier le mot de passe d\'un compte ?',
    answer: (
      <>
        Pour modifier le mot de passe d'un compte, il faut passer par la page de mot de passe oublié, accessible dans
        la popup lorsque vous n'êtes pas connecté.
      </>
    ),
  },
  {
    question: 'Peut-on proposer des évolutions de la charte ?',
    answer: (
      <>
        Si vous avez des idées pour améliorer la charte, que ce soit sur le fond ou sur la forme, vous pouvez{' '}
        <a href="#contact">contacter</a> l'équipe qui développe le projet.
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
    answer: 'Le but de CDV n\'est pas de faire de l\'argent, et aucun financement n\'est en jeu.',
  },
  {
    question: 'Qui développe CDV ?',
    answer: (
      <>
        CDV est développé par une <a href="https://nils.cx">petite</a> <a href="https://bopzor.me">équipe</a> de
        développeurs passionnés d'esprit critique et de zététique.
      </>
    ),
  },
  {
    question: 'Peut-on participer au projet',
    answer: (
      <>
        Si vous souhaitez participer au projet, vous êtes invités à <a href="#contact">contactez</a> l'équipe
        qui développe le projet pour en discuter. Et si vous êtes développeurs et que le projet vous intéresse
        techniquement, les source sont <a href={env.GITHUB_REPO_URL}>disponibles sur github</a>.
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

    <p>L'équipe à l'origine de CDV est à l'écoute via ces différents canaux de communication :</p>

    <ul>
      <li>Par email, à l'adresse <a href="mailto:cdv@nils.cx">cdv@nils.cx</a></li>
      <li>Sur twitter, via le compte de <a href="https://twitter.com/NilsCox">@NilsCox</a></li>
      <li>Par chat, via <a href="https://tlk.io/cdv" target="_blank" rel="noopener noreferrer">tlk.io</a></li>
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
