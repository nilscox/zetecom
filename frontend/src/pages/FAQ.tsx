import React from 'react';

import PageTitle from './components/PageTitle';
import Box from 'src/components/common/Box';

const questions = [
  {
    question: 'Comment créer un compte sur CDV ?',
    answer: (
      <>
        Le projet étant encore en phase de test, l'inscription n'est pas encore ouverte à tous pour l'instant. Si vous
        souhaitez faire partie des testeurs, vous pouvez <a href="mailto:nils@nils.cx">contacter</a> l'équipe qui développe
        le projet.
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
