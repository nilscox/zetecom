import React from 'react';

import PageTitle from './components/PageTitle';
import Box from 'src/components/common/Box';
import env from 'src/utils/env';

const questions = [
  {
    question: 'Comment créer un compte sur CDV ?',
    answer: (
      <>
        Le projet étant en phase de test, l'inscription n'est pas encore ouverte à tous pour l'instant. Si vous
        souhaitez faire partie des testeurs, vous pouvez <a href="mailto:nils@nils.cx">contacter</a> l'équipe qui développe
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
        Il est nécéssaire de <a href="mailto:nils@nils.cx">contacter</a> l'équipe qui développe le projet pour demander
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
        Il est possible de supprimer un compte en <a href="mailto:nils@nils.cx">contactant</a> l'équipe qui développe
        le projet.
      </>
    ),
  },
  {
    question: 'Peut-on proposer des évolutions de la charte ?',
    answer: (
      <>
        Si vous avez des idées pour améliorer la charte, que ce soit sur le fond ou sur la forme, vous pouvez{' '}
        <a href="mailto:nils@nils.cx">contacter</a> l'équipe qui développe le projet.
      </>
    ),
  },
  {
    question: 'Comment remonter un bug ou proposer de nouvelles fonctionnalités ?',
    answer: (
      <>
        Vous l'aurez peut-être deviné, <a href="mailto:nils@nils.cx">contactez</a> l'équipe qui développe le projet.
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
        Si vous souhaitez participer au projet, vous êtes invités à <a href="mailto:nils@nils.cx">contactez</a> l'équipe
        qui développe le projet pour en discuter. Et si vous êtes développeurs et que le projet vous intéresse
        techniquement, les source sont <a href={env.GITHUB_REPO_URL}>disponibles sur github</a>.
      </>
    ),
  },
  {
    question: 'Votre question ne figure pas dans cette liste... ?',
    answer: <><a href="mailto:nils@nils.cx">Contactez</a> l'équipe qui développe le projet !</>,
  },
];

type QuestionProps = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  return (
    <Box my={12}>
      <strong>
        {question}
      </strong>
      <p>
        {answer}
      </p>
    </Box>
  );
};

const FAQ: React.FC = () => {
  return (
    <div id="FAQ">

      <Box mt={40} mb={20}>
        <PageTitle>Questions posées fréquemment</PageTitle>
      </Box>

      {questions.map((props, n) => <Question key={n} {...props} />)}

    </div>
  );
};

export default FAQ;
