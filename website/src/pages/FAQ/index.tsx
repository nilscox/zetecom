/* eslint-disable max-lines, react/no-unescaped-entities */

import React, { useState } from 'react';

import clsx from 'clsx';

import Title from 'src/components/Title';
import SubTitle, { SubTitleProps } from 'src/components/SubTitle';
import Link from 'src/components/Link';
import { useEnvironment } from 'src/utils/env';

import { trackOpenRepositoryLink } from '../../utils/track';

import './FAQ.scss';

const FAQSection: React.FC<SubTitleProps> = (props) => (
  <SubTitle {...props} className={clsx(props.className, 'faq-section')} />
);

const useSections = () => [

  {
    title: <FAQSection id="compte-utilisateur">Compte utilisateur</FAQSection>,
    questions: [

      {
        question: 'Est-il possible d\'utiliser l\'extension sans créer de compte ?',
        answer: <>Oui, pour lire les commentaires. La création d'un compte n'est nécessaire que si vous souhaitez interagir avec les autres membres de la plateforme.</>,
      },

      {
        question: 'Comment créer un compte ?',
        answer: <>Les inscriptions ne sont pas encore ouvertes publiquement pour l'instant. Si vous souhaitez rejoindre les béta-testeurs, toutes les informations sont disponibles sur <Link href="/beta.html">la page bêta</Link>.</>,
      },

      {
        question: 'Comment modifier le mot de passe d\'un compte ?',
        answer: <>Vous pouvez mettre à jour le mot de passe de votre compte, en passant par la popup de l'extension lorsque vous êtes connecté.e.</>,
      },

    ],
  },

  {
    title: <FAQSection id="utilisation-extension">Utilisation de l'extension</FAQSection>,
    questions: [

      {
        question: 'Comment ouvrir une nouvelle zone de commentaire sur un article ou une vidéo ?',
        answer: <>Pour le moment, c'est une action manuelle réservée aux administrateurs.</>,
      },

      {
        question: 'Comment mettre en page un commentaire ?',
        answer: <>Les messages peuvent être rédigés en <Link openInNewTab href="https://fr.wikipedia.org/wiki/Markdown">markdown</Link>, une syntaxe de balisage permettant une mise en forme simple.</>,
      },

      {
        question: 'Comment indiquer son degré de croyance en exposant ?',
        answer: <>La charte vous encourage à expliciter votre degré de croyance dans ce que vous affirmez. Pour se faire, utilisez le symbole <code>^</code> :<br />
        "<code>J'apprécie les fruits au sirop^42</code>" deviendra "J'apprécie les fruits au sirop<sup>42</sup>".</>,
      },

      {
        question: 'Comment signaler un bug ou proposer de nouvelles fonctionnalités ?',
        answer: <><Link href="#contact">Contactez</Link> directement l'équipe qui développe le projet, nous sommes ouverts à vos remarques.</>,
      },

    ],
  },

  {
    title: <FAQSection id="moderation">La modération</FAQSection>,
    questions: [

      {
        question: 'Comment est assurée la modération ?',
        answer: <>Les messages signalés sont traités par des membres volontaires de la communauté.</>,
      },

      {
        question: 'Qui peut devenir modérateur ?',
        answer: <>Tous les membres de Zétécom peuvent demander de devenir modérateur, chaque demande sera traitée au cas par cas.</>,
      },

    ],
  },

  {
    title: <FAQSection id="le-projet">Le projet</FAQSection>,
    questions: [

      {
        question: 'Est-ce légal de modifier les sites pour y ajouter des zones de commentaires ?',
        answer: <>Oui. Lorsque vous installez l'extension sur votre navigateur, la permission de modifier certains sites web vous est demandée.
        Avec votre accord, l'extension sera en mesure de modifier les sites sur lequelles il existe des zones de commentaires (sur votre navigateur, et celui de chaque utilisateur disposant de l'extension).
        C'est le même principe qu'un bloqueur de publicité, ou qu'une extension ajoutant un "mode sombre".</>,
      },

      {
        question: 'Comment le projet est-il financé ?',
        answer: <>Le but du projet n'est pas de faire du profit, et aucun financement n'est en jeu.</>,
      },

      {
        question: 'Qui développe Zétécom ?',
        answer: <>Le projet est développé par une <Link openInNewTab href="https://nils.cx">petite</Link> <Link openInNewTab href="https://bopzor.me">équipe</Link> de développeurs passionnés par l'esprit critique et la <Link openInNewTab href="https://fr.wikipedia.org/wiki/Zététique">zététique</Link>.</>,
      },

      {
        question: 'Peut-on participer au projet ?',
        answer: <>Que ce soit pour donner vos impressions, proposer des axes d'amélioration, ou même plus généralement réfléchir au concept de Zétécom et imaginer ce que l'on peut construire ensemble, vous êtes chaleureusement invité.e à <Link href="#contact">nous envoyer un petit message</Link>.
        Et si vous êtes développeu.r.se et que le projet vous intéresse techniquement, les source sont disponibles sur <Link openInNewTab href={useEnvironment('REPOSITORY_URL')} onClick={() => trackOpenRepositoryLink('faq')}>GitHub</Link>.</>,
      },

      {
        question: 'Votre question ne figure pas dans cette liste... ?',
        answer: <><Link href="#contact">Posez-la nous directement</Link>, nous l'y ajouterons sans tarder :)</>,
      },

    ],
  },

];

type QuestionProps = {
  open: boolean;
  question: string;
  onToggle: (e: React.MouseEvent) => void;
};

const Question: React.FC<QuestionProps> = ({ open, question, children, onToggle }) => (
  <div className="faq-item">
    <div className={clsx('collapse-arrow', open && 'open')}>▶</div>
    <strong className="question" onClick={onToggle}>{ question }</strong>
    <div className="answer" style={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}>
      <p>
        { children }
      </p>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const questionId = (sectionIdx: number, questionIdx: number) => [sectionIdx, questionIdx].join(':');

  const sections = useSections();

  const initialState = (value: boolean) => {
    const state: Record<string, boolean> = {};

    for (const [sectionIdx, { questions }] of sections.entries()) {
      for (const [questionIdx] of questions.entries()) {
        state[questionId(sectionIdx, questionIdx)] = value;
      }
    }

    return state;
  };

  const [open, setOpen] = useState(initialState(false));

  const handleToggle = (questionId: string) => (e: React.MouseEvent) => {
    if (e.ctrlKey || e.altKey || e.shiftKey) {
      // if at least one is closed, we open all
      if (Object.values(open).some(value => !value))
        setOpen(initialState(true));
      else
        setOpen(initialState(false));
    } else
      setOpen({ ...open, [questionId]: !open[questionId] });
  };

  return (
    <>

      <Title id="faq">Questions posées fréquemment</Title>

      { sections.map(({ title, questions }, sectionIdx) => (
        <React.Fragment key={sectionIdx}>
          {title}
          {questions.map(({ question, answer }, questionIdx) => (
            <Question
              key={questionIdx}
              question={question}
              open={open[questionId(sectionIdx, questionIdx)]}
              onToggle={handleToggle(questionId(sectionIdx, questionIdx))}
            >
              {answer}
            </Question>
          ))}
        </React.Fragment>
      )) }

      <Title id="donnees-personnelles">Utilisation des données personnelles</Title>

      <p>
        L'installation de l'extension et son utilisation sans créer de compte vous permet d'intégrer les zones de commentaires sur les sites d'information, mais ne vous permet pas de répondre à ces commentaires.
        Dans ce cas, aucune information personnelle n'est collectée.
      </p>

      <p>
        Si vous souhaitez interagir avec la communauté, la création d'un compte utilisateur est nécessaire.
        Dans ce cas, une adresse e-mail, un mot de passe et un pseudo vous seront demandés, dans le seul but de vous identifier sur la plateforme.
        Aucune de ces informations n'est partagée avec un quelconque service tiers.
      </p>

      <p>
        Tous les échanges de données sont effectués de manière sécurisée (HTTPS), et les mots de passes sont chiffrés avec la fonction de hashage <code>bcrypt</code> (coût de 10).
      </p>

      <p>
        Dans une optique de transparence, nous sommes entièrement disposés à répondre à vos éventuelles questions, voire ajouter ici des précisions si nécessaire.
      </p>

      <Title id="contact">Une idée à proposer ? Un bug à signaler ?</Title>

      <p>L'équipe à l'origine de Zétécom est à l'écoute via ces différents canaux de communication :</p>

      <ul>
        {useEnvironment('CONTACT_EMAIL') && <li>Par e-mail : <Link openInNewTab href={`mailto:${useEnvironment('CONTACT_EMAIL')}`}>{useEnvironment('CONTACT_EMAIL')}</Link></li>}
        {useEnvironment('TWITTER_ACCOUNT') && <li>Sur twitter : <Link openInNewTab href={`https://twitter.com/${useEnvironment('TWITTER_ACCOUNT')}`}>twitter.com/{useEnvironment('TWITTER_ACCOUNT')}</Link></li>}
        {useEnvironment('FACEBOOK_PAGE') && <li>Sur facebook : <Link openInNewTab href={`https://facebook.com/${useEnvironment('FACEBOOK_PAGE')}`}>facebook.com/{useEnvironment('FACEBOOK_PAGE')}</Link></li>}
      </ul>

    </>
  );
};

export default FAQ;
