/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from 'src/components/Title';
import SubTitle from 'src/components/SubTitle';
import Link from 'src/components/Link';
import Tlkio from 'src/components/Tlkio';
import { useEnvironment } from 'src/index';

import './FAQ.scss';

type QuestionProps = {
  question: React.ReactNode;
};

const Question: React.FC<QuestionProps> = ({ question, children }) => (
  <div className="question">
    <strong>{ question }</strong>
    <p>{ children }</p>
  </div>
);

const FAQ: React.FC = () => {
  return (
    <>

      <Title id="faq">Questions posées fréquemment</Title>

      <Question question="Comment créer un compte sur Réaciton à l'information ?">
        Le projet étant en phase de test, l'inscription n'est pas encore ouverte à tous pour l'instant. Si vous
        souhaitez faire partie des testeurs, vous pouvez <Link href="#contact">contacter</Link> l'équipe qui développe
        le projet.
      </Question>

      <Question question="Où trouver la liste des zones de commentaires disponibles avec l'extension ?">
        Pour le moment, il n'est pas possible de lister les pages contenant une zone de commentaire propre à la
        platforme.
      </Question>

      <Question question="Comment créer une nouvelle zone de commentaires ?">
        Il est nécessaire de <Link href="#contact">contacter</Link> l'équipe qui développe le projet pour demander
        l'ajout d'une nouvelle zone de commentaire.
      </Question>

      <Question question="Comment mettre en page une réaction ?">
        Les messages peuvent être rédigées en <Link href="https://fr.wikipedia.org/wiki/Markdown">markdown</Link>, un
        langage de balisage permettant une mise en forme simple.
      </Question>

      <Question question="Comment est assurée la modération ?">
        Les messages signalés sont traités par des membres volontaires de la communauté.
      </Question>

      <Question question="Qui peut devenir modérateur ?">
        Tous les membres de la communauté ! Si vous êtes motivé(e), <Link href="#contact">contactez</Link> l'équipe qui
        développe le projet pour expliquer les raisons qui motivent ce choix, nous en discuterons directement.
      </Question>

      <Question question="Comment supprimer un compte de la platforme ?">
        Il est possible de supprimer un compte en <Link href="#contact">contactant</Link> l'équipe qui développe
        le projet par e-mail, depuis l'adresse associée au compte à supprimer.
      </Question>

      <Question question="Comment modifier le mot de passe d'un compte ?">
        Pour modifier le mot de passe d'un compte, cliquez sur le lien "mot de passe oublié" accessible via la popup de
        l'extension lorsque vous n'êtes pas connecté.
      </Question>

      <Question question="Comment signaler un bug ou proposer de nouvelles fonctionnalités ?">
        Vous l'aurez peut-être deviné, <Link href="#contact">contactez</Link> l'équipe qui développe le projet.
      </Question>

      <Question question="Comment le projet est-il financé ?">
        Le but du projet n'est pas de faire du profit, et aucun financement n'est en jeu.
      </Question>

      <Question question="Qui développe Réagir à l'information ?">
        Le projet est développé par une <Link openInNewTab href="https://nils.cx">petite</Link>{' '}
        <Link openInNewTab href="https://bopzor.me">équipe</Link> de développeurs passionnés d'esprit critique et de{' '}
        <Link openInNewTab href="https://fr.wikipedia.org/wiki/Zététique">zététique</Link>.
      </Question>

      <Question question="Peut-on participer au projet">
        Si vous souhaitez participer au projet, pour donner des feedbacks ou proposer des axes d'amélioration, vous êtes
        invité(e) à <Link href="#contact">contactez</Link> l'équipe qui développe le projet pour en discuter. Et si vous
        êtes développeurs et que le projet vous intéresse techniquement, les source sont disponibles sur{' '}
        <Link href={useEnvironment('REPOSITORY_URL')}>github</Link>.
      </Question>

      <Question question="Votre question ne figure pas dans cette liste... ?">
        <Link href="#contact">Contactez</Link> l'équipe qui développe le projet !
      </Question>

      <SubTitle id="contact">Une idée à proposer ? Un bug à signaler ?</SubTitle>

      <p>L'équipe à l'origine de Réagir à l'information est à l'écoute via ces différents canaux de communication :</p>

      <ul>
        <li>
          Par e-mail, à l'adresse <Link href="mailto:reagir-information@nils.cx">reagir-information@nils.cx</Link>
        </li>
        <li>Sur twitter, via le compte de <Link openInNewTab href="https://twitter.com/NilsCox">@NilsCox</Link></li>
        <li>Par chat, via <Link openInNewTab href="https://tlk.io/reagir-information" >tlk.io</Link></li>
      </ul>

      <SubTitle id="chat">Chat en direct</SubTitle>

      <Tlkio />

    </>
  );
};

export default FAQ;
