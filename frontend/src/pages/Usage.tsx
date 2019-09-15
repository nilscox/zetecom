/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Note from './components/Note';
import DownloadExtension from './components/DownloadExtensionButton';
import Image from './components/Image';
import Flex from 'src/components/common/Flex';
import { Link } from 'react-router-dom';

/*

- Installation
  - extension chrome

- Utilisation
  - sujets
    - regrouper les réactions par thématiques portant sur l'information
    - recherche / tri
    - création
      - lien direct avec l'information
      - citation
  - lire les réactions
    - ouvrir un sujet (retour à la liste des sujets)
    - lire les réponses
      - nuancer l'information
      - mettre en perspective
      - comprendre des opinions différentes
      - mettre en évidence des biais
      - apporter des sources
      - poser des questions
    - réactions nestées
    - modération : signaler les réactions
  - quick réactions
    - favoriser le référencement pour mettre en avant les réactions les plus pertinentes ou les plus controversées
  - rédiger une réaction
    - respect de la charte : cadrer les débats, zone saine d'écoute et de partage collaboratif
    - scope (sujet, réponse)
    - édition
    - format markdown
  - inscription
    - inscription / authentification (email -> spam)
    - mot de passe oublié
    - changement de mot de passe / suppression du compte

*/

const NavigationSection: React.FC<{ section: string }> = ({ section, children }) => (
  <li style={{ paddingBottom: 15 }}>
    <div style={{ fontSize: '1.2rem', color: '#444' }}>
      <a style={{ textDecoration: 'none' }} href={`#${section.replace(' ', '_')}`}>{ section }</a>
    </div>
    { children && (
      <ul style={{ listStyleType: 'none', paddingLeft: 15, margin: 0 }}>
        { children }
      </ul>
    ) }
  </li>
);

const NavigationSubSection: React.FC<{ name: string }> = ({ name }) => (
  <li style={{ color: '#555' }}>
    <a style={{ textDecoration: 'none' }} href={`#${name.replace(/ /g, '_')}`}>{ name }</a>
  </li>
);

const Navigation: React.FC = () => (
  <nav style={{ flex: 1, order: 2, position: 'relative' }}>

    <ul style={{ position: 'sticky', top: 30, listStyleType: 'none', paddingLeft: 15, margin: 0, marginTop: 30 }}>

      <NavigationSection section="Installation" />

      <NavigationSection section="Utilisation">
        <NavigationSubSection name="Liste des sujets" />
        <NavigationSubSection name="Lire les réactions" />
        <NavigationSubSection name="Quick réactions" />
        <NavigationSubSection name="Rédiger une réaction" />
      </NavigationSection>

      <NavigationSection section="Inscription">
        <NavigationSubSection name="Inscription / Connexion" />
        <NavigationSubSection name="Mot de passe oublié" />
        <NavigationSubSection name="Changement de mot de passe" />
      </NavigationSection>

      <NavigationSection section="Modération">
        <NavigationSubSection name="Signaler une réaction" />
        <NavigationSubSection name="Rejoindre les modérateurs" />
      </NavigationSection>

    </ul>

  </nav>
);

const Usage: React.FC = () => {
  return (
    <div style={{ flex: 4 }}>
      <Title id="Installation">Installation</Title>

      <p>
        Pour permettre l'ajout d'une zone de commentaires sur les sites que vous visitez, il est
        nécessaire de passer par une extension sur votre navigateur. Cette extension n'est pour le
        moment disponible que sur{' '}
        <a href="https://google.com/chrome" target="_blank" rel="noopener noreferrer">
          Google Chrome
        </a>
        . Cliquez sur le bouton ci-dessous pour accéder à la page de l'extension, et cliquez sur
        "Ajouter à chrome".
      </p>

      <DownloadExtension>Installer l'extension chrome</DownloadExtension>

      <p>
        Une fois l'extension installée, il vous est possible de consulter les zones de commentaires
        CDV sur certains sites. Pour le moment, elles sont activées sur certaines vidéos YouTube
        uniquement. Bientôt, d'autres sites d'informations seront supportés.
      </p>

      <Title id="Utilisation">Utilisation</Title>

      <Image
        style={{ width: 96, float: 'right', margin: '0 0 10px 10px' }}
        src="/assets/images/extension-active.png"
      />

      <p>
        Lorsque vous visitez une page web qui intègre une zone de commentaires, l'icône de
        l'extension vous l'indique par un status actif, en affichant un badge vert.
      </p>

      <p style={{ clear: 'right' }}>
        Vous trouverez dans la page une liste de sujets, regroupant les commentaires par
        thématiques. Cela peut être pour discuter de la validité d'un argument, pour remettre en
        cause l'information en apportant des sources, ou encore pour poser une question...
      </p>

      <SubTitle id="Liste_des_sujets">Liste des sujets</SubTitle>

      <Flex flexDirection="row">
        <div style={{ flex: 1 }}>
          <p>
            Les zones de commentaires regroupent les réactions par sujet pour permettre de cibler un
            point précis à débattre. La liste n'affiche par défaut que le titre de chaque sujet,
            mais il est possible de cliquer sur ce titre pour lire sa description et ouvrir les
            réactions qui y sont rattachées.
          </p>

          <p>
            Si vous êtes <a href="#signup">inscris sur CDV</a>, vous pouvez ouvrir un nouveau sujet.
            Chaque sujet doit être directement rattaché à l'information, et n'être traité qu'une
            seule fois (pensez à utiliser la fonction de recherche). Si vous faites référence à une
            partie énoncée dans l'information, utilisez le champ "citation" pour la préciser. Dans
            le cas d'une vidéo YouTube pensez à inclure le minutage de cette citation.
          </p>

          <p>
            Pour aller plus vite, vous pouvez ouvrir les réactions d'un sujet directement en
            cliquant sur le nombre de commentaires, en haut à droite de chaque ligne dans la liste.
            Après avoir ouvert un sujet, il est possible de revenir à la liste via le bouton
            "retour".
          </p>
        </div>

        <div style={{ flex: 1, paddingLeft: 15 }}>
          <Image maximize src="/assets/images/subjects.png" style={{ width: '100%' }} />
        </div>
      </Flex>

      <SubTitle id="Lire_les_réactions">Lire les réactions</SubTitle>

      <p>
        Les échanges qui se déroulent dans les espaces de commentaires sont uniquement alimenté par
        la communauté, et respectent donc la charte. Ce qui laisse la place aux échanges d'idées
        dans un cadre collaboratif, bienveillant et respectueux, mais se passera des affirmations
        sans preuves, des blagues et autres trolls. Les points de vus des membres de la communauté
        vont permettre de nuancer l'information ou de discuter plus en détail sur certains points,
        de manière construite et rigoureuse.
      </p>

      <p>
        Afin de suivre l'évolution des débats et garder un lien entre les messages, une réaction
        peut être rattachée directement au sujet, ou bien être rédigée en réponse à une autre. Pour
        faciliter la lecture, les réponses sont cachées par défaut.
      </p>

      <p>
        Si une réaction n'a pas sa place dans une zone de commentaires CDV, il est possible de la
        signaler. Cela enverra une notification aux modérateurs, qui prendront une décision en
        fonction de la situation. Attention cependant à signaler les réaction pour de bonnes raisons
        ! Un message qui va à l'encontre de vos idées n'est pas un motif raisonnable...
      </p>

      <SubTitle id="Quick_réactions">Quick réactions</SubTitle>

      <p>
        Certaines réactions vont apporter des précisions, vous faire réfléchir, peut-être même vous
        faire changer d'avis ! Si beaucoup d'utilisateurs trouvent une même réaction pertinente, il
        semble naturel de la mettre en avant. Vous pouvez ainsi annoter une réaction existante d'un
        "J'approuve" 👍, "Je réfute" 👎, ou bien "Je suis sceptique..." 🧐, pour donner votre avis,
        entièrement subjectif. Un algorithme va comptabiliser le nombre total d'annotations pour
        vous présenter les réactions les plus impactantes lorsque vous choisissez de le tri par
        pertinence.
      </p>

      <ul>
        <li>
          👍 J'approuve : je trouve que cette réaction est pertinente et je suis d'accord avec le
          message
          <ul>
            <li>elle apporte des éléments me convaincant</li>
          </ul>
        </li>
        <li>
          👎 Je réfute : je trouve que cette réaction est pertinente mais je ne suis pas d'accord
          avec le message
          <ul>
            <li>
              la méthode utilisée me semble incorrecte ou biaisée j'ai une preuve du contraire
            </li>
          </ul>
        </li>
        <li>
          🧐 Je suis septique : je trouve que cette réaction est pertinente
          <ul>
            <li>elle n'apporte pas assez d'éléments pour me convaincre</li>
            <li>j'ai besoin de m'informer plus sur le sujet pour me faire une opinion</li>
            <li>
              elle évoque une problématique qui vaut la peine d'être discutée plus en profondeur
            </li>
          </ul>
        </li>
      </ul>

      <Note>
        Note : réfuter une réaction ne va pas la faire baisser dans le classement. L'algorithme
        prend en compte que vous y avez accordé de l'importance, même si vous n'êtes pas d'accord
        avec le message.
      </Note>

      <SubTitle id="Rédiger_une_réaction">Rédiger une réaction</SubTitle>

      <ul style={{ display: 'none' }}>
        <li>
          respect de la charte : cadrer les débats, zone saine d'écoute et de partage collaboratif
        </li>
        <li>scope (sujet, réponse)</li>
        <li>édition</li>
        <li>format markdown</li>
      </ul>

      <p>
        Si vous avez quelque chose à partager avec la communauté, vous pouvez rédiger une nouvelle
        réaction. Vous devrez pour cela <Link to="#inscription">créer un compte</Link>, et donc lire
        et accepter <Link to="/charte">la charte de CDV</Link>. Gardez bien ces règles en tête
        lorsque vous écrivez un message.
      </p>

      <p>Deux types de réactions sont possibles :</p>

      <ul>
        <li>en réponse au sujet directement</li>
        <li>en réponse à une autre réaction</li>
      </ul>

      <p>
        Veillez à bien identifier à quel message vous répondez, et donc à rédiger le votre à
        l'emplacement adéquat. Les réponses imbriquées permettant de suivre l'évolution des
        échanges.
      </p>

      <p>
        Personne n'est à l'abri d'une erreur ! Vous pouvez, à tout moment modifier une réaction dont
        vous êtes l'auteur, pour changer la formulation. Attention cependant à conserver le sens
        original du message, de manière à ce que l'échange reste cohérent. Après qu'une réaction est
        publiée, il n'est pas possible de l'effacer. Vous avez partagé votre point de vue à un
        moment donné, mais si votre pensée évolue ultérieurement, vous êtes invité(e) à rédiger un
        nouveau message faisant part de vos découvertes...
      </p>

      <p>
        Les réactions sur CDV supportent un outil de mise en page simple, permettant d'inclure des
        liens, du texte en gras ou en italique, des listes, des tableaux, etc... via un langage de
        balisage, le{' '}
        <a href="https://docs.microsoft.com/fr-fr/contribute/how-to-write-use-markdown">markdown</a>
        . Un onglet "aperçu" vous permet de visualiser le message tel qu'il va apparaître, avant de
        le poster.
      </p>

      <Title id="Inscription">Inscription</Title>

      <Note>Note : la suite de cette page est en cours de réaction...</Note>

      <ul>
        <li>inscription</li>
        <li>mot de passe oublié</li>
        <li>changement de mot de passe</li>
      </ul>

      <Title id="Modération">Modération</Title>

      <ul>
        <li>Signaler une réaction</li>
        <li>Rejoindre les modérateurs</li>
      </ul>
    </div>
  );
};

const UsagePage: React.FC = () => (
  <Flex flexDirection="row">
    <Navigation />
    <Usage />
  </Flex>
);

export default UsagePage;
