import React, { useState } from 'react';

import clsx from 'clsx';

import Title from 'src/components/Title';
import SubTitle, { SubTitleProps } from 'src/components/SubTitle';
import Link from 'src/components/Link';
import { useEnvironment } from 'src/utils/env';

import { trackOpenRepositoryLink, trackOpenFeatureUpvoteLink } from '../../utils/track';

import './FAQ.scss';

const FAQSection: React.FC<SubTitleProps> = (props) => (
  <SubTitle {...props} className={clsx(props.className, 'faq-section')} />
);

const useSections = () => [

  {
    title: <FAQSection id="compte-utilisateur">Compte utilisateur</FAQSection>,
    questions: [

      {
        question: 'Est-il possible d\'utiliser Zétécom sans créer de compte ?',
        answer: <>Oui, pour lire les commentaires. La création d'un compte n'est nécessaire que si vous souhaitez interagir avec les autres membres de la plateforme.</>,
      },

      {
        question: 'Comment créer un compte ?',
        answer: <>Vous pouvez ouvrir un compte utilisateur depuis la page <Link href="/connexion">connexion</Link> de la plateforme, ou via la popup de l'extension.</>,
      },

      {
        question: 'Comment modifier le mot de passe d\'un compte ?',
        answer: <>Vous pouvez mettre à jour le mot de passe de votre compte, en passant par la popup de l'extension lorsque vous êtes connecté.e.</>,
      },

      {
        question: 'Comment supprimer un compte ?',
        answer: <>En conformité avec le règlement général sur la protection des données (RGPD), vous pouvez demander la suppression de votre compte en contactant l'équipe qui développe le projet.</>,
      },

    ],
  },

  {
    title: <FAQSection id="plateforme">La plateforme</FAQSection>,
    questions: [

      {
        question: 'Comment ouvrir une nouvelle zone de commentaire sur un article ou une vidéo ?',
        answer: <>Vous pouvez demander l'ouverture d'une zone de commentaires via l'extension, sur la page de concernée. Cette demande sera envoyée aux modérateurs, qui procéderont à l'ouverture manuellement.</>,
      },

      {
        question: 'Comment mettre en page un commentaire ?',
        answer: <>Les messages supportent la syntaxe <Link openInNewTab href="https://fr.wikipedia.org/wiki/Markdown">markdown</Link>, qui permet une mise en forme simple : utilisez par exemple des étoiles pour mettre du texte <strong>*en gras*</strong>. Plus de détails ici : <Link openInNewTab href="https://learnxinyminutes.com/docs/fr-fr/markdown-fr/">https://learnxinyminutes.com/docs/fr-fr/markdown-fr/</Link></>,
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
    title: <FAQSection id="extension">L'extension</FAQSection>,
    questions: [

      {
        question: 'Est-ce légal de modifier les sites pour y ajouter des zones de commentaires ?',
        answer: <>Oui. Lorsque vous installez l'extension sur votre navigateur, la permission de modifier les sites que vous visitez vous est demandée.
        Avec votre accord, l'extension sera en mesure d'intégrer les zones de commentaires à l'intérieur des pages concernées.
        C'est le même principe qu'un bloqueur de publicité, ou qu'une extension ajoutant un mode sombre sur tous les sites par exemple.</>,
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
        question: 'Comment le projet est-il financé ?',
        answer: <>Le but du projet n'est pas de faire du profit, et aucun financement n'est en jeu. Les seuls coûts nécessaires au fonctionnement de Zétécom sont un serveur et un nom de domaine, environ 100 euros par an, pris en charge par les développeurs du projet.</>,
      },

      {
        question: 'Peut-on participer au projet ?',
        answer: <>Que ce soit pour donner vos impressions, proposer des axes d'amélioration, vous êtes chaleureusement invité.e à <Link href="#contact">nous envoyer un petit message</Link>.
        Et pour aller plus loin, <Link href="/beta.html">rejoignez les bêta-testeurs</Link> ! Vos retours nous aideront à comprendre vos attentes pour mieux y répondre.</>
      },

      {
        question: 'Comment suivre l\'évolution du projet ?',
        answer: <>Un <Link href="https://trello.com/b/CfC8aQ80/tasks">board tello</Link> est accessible publiquement, n'hésitez pas à y jeter un œil !
        Et si vous êtes développeu.r.se et que le projet vous intéresse techniquement, les source sont disponibles sur <Link openInNewTab href={useEnvironment('REPOSITORY_URL')} onClick={() => trackOpenRepositoryLink('faq')}>GitHub</Link>.</>,
      },

      {
        question: 'Qui développe Zétécom ?',
        answer: <>Le projet est développé par une <Link openInNewTab href="https://nils.cx">petite</Link> <Link openInNewTab href="https://bopzor.me">équipe</Link> de développeurs passionnés par l'esprit critique et la <Link openInNewTab href="https://fr.wikipedia.org/wiki/Zététique">zététique</Link>.</>,
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
  const CONTACT_EMAIL = useEnvironment('CONTACT_EMAIL');
  const TWITTER_ACCOUNT = useEnvironment('TWITTER_ACCOUNT');
  const FACEBOOK_PAGE = useEnvironment('FACEBOOK_PAGE');

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

      <p>
        Venez partager vos idées d'améliorations et voter pour les idées qui vous semblent pouvoir apporter de la valeur au projet sur <Link openInNewTab href="https://zetecom.featureupvote.com/" onClick={trackOpenFeatureUpvoteLink}>FeatureUpvote</Link> !
      </p>

      <p>Nous sommes également à l'écoute de vos remarques via ces différents canaux de communication :</p>

      <ul>
        {TWITTER_ACCOUNT && <li>Sur twitter : <Link openInNewTab href={`https://twitter.com/${TWITTER_ACCOUNT}`}>twitter.com/{TWITTER_ACCOUNT}</Link></li>}
        {FACEBOOK_PAGE && <li>Sur facebook : <Link openInNewTab href={`https://facebook.com/${FACEBOOK_PAGE}`}>facebook.com/{FACEBOOK_PAGE}</Link></li>}
        {CONTACT_EMAIL && <li>Par e-mail : <Link openInNewTab href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link></li>}
      </ul>

    </>
  );
};

export default FAQ;
