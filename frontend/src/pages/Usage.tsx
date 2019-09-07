/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';
import { Link } from 'react-router-dom';

import env from 'src/utils/env';

import SubTitle from './components/SubTitle';
import Note from './components/Note';
import DownloadExtension from './components/DownloadExtensionButton';
import FloatingImage, { ClearFix } from './components/FloatingImage';
import Title from './components/Title';

/*

- Installation
  - extension chrome

- Utilisation
  - sujets
    - regrouper les réactions par thématiques portant sur l'information
    - recherche / tri
    - création
  - lire les réactions
    - ouvrir un sujet (retour à la liste des sujets)
    - lire les réponses
      - nuancer l'information
      - mettre en perspective
      - comprendre des opinions différentes
      - mettre en évidence des biais
      - apporter des sources
      - poser des questions
    - quick réactions : favoriser le référencement pour mettre en avant les réactions les plus pertinentes ou les plus controversées
    - modération : signaler les réactions
  - rédiger une réaction
    - respect de la charte : cadrer les débats, zone saine d'écoute et de partage collaboratif
    - scope (sujet, réponse)
    - citation
    - format markdown
    - édition
  - inscription
    - inscription / authentification (email -> spam)
    - mot de passe oublié
    - changement de mot de passe / suppression du compte

--

J'approuve : je trouve que cette réaction est pertinente et je suis d'accord avec le message
  elle apporte des éléments me convaincant
Je réfute : je trouve que cette réaction est pertinente mais je ne suis pas d'accord avec le message
  la méthode utilisée me semble incorrecte ou biaisée
  j'ai une preuve du contraire
Je suis septique : je trouve que cette réaction est pertinente
  elle n'apporte pas assez d'éléments pour me convaincre
  j'ai besoin de m'informer plus sur le sujet pour me faire une opinion
  elle évoque une problématique qui vaut la peine d'être discutée plus en profondeur

*/

const Home: React.FC = () => {
  return (
    <div
      id="Usage"
      className="page"
    >

      <Title>Installation</Title>

      <p>
        Pour permettre l'ajout d'une zone de commentaires sur les sites que vous visitez, il est nécessaire de passer
        par une extension sur votre navigateur. Cette extension n'est pour le moment disponible que sur{' '}
        <a href="https://google.com/chrome" target="_blank" rel="noopener noreferrer">Google Chrome</a>. Cliquez sur
        le bouton ci-dessous pour accéder à la page de l'extension, et cliquez sur "Ajouter à chrome".
      </p>

      <DownloadExtension>
        Installer l'extension chrome
      </DownloadExtension>

      <p>
        Une fois l'extension installée, il vous est possible de consulter les zones de commentaires sur les sites
        supportés. Pour le moment, des zones de commentaires CDV existent sur certaines vidéos YouTube uniquement.
        Bientôt, d'autres sites d'informations seront supportés.
      </p>

      <Title>Utilisation</Title>

      <FloatingImage width={96} float="right" src="/assets/images/extension-active.png" />

      <p>
        Lorsque vous visitez une page web qui intègre une zone de commentaires CDV, l'icône de l'extension vous
        l'indique par un status actif, en affichant un badge vert. Vous pouvez alors trouver cette zone de
        commentaires sur la page et lire les débats en cours, regroupés par sujets. Pour participer aux échanges, il
        vous faudra <a href="#signup">créer un compte sur la plateforme</a>.
      </p>

      <ClearFix />

      <SubTitle>Liste des sujets</SubTitle>

      <FloatingImage width={640} float="left" src="/assets/images/subjects.png" />

      <p>
        Les zones de commentaires regroupent les réactions par sujet, pour permettre de cibler un point précis à
        débattre. La liste n'affiche par défaut que le titre de chaque sujet, mais il est possible de cliquer sur ce
        titre pour lire la description du sujet, et ouvrir les réactions qui y sont rattachées.
      </p>

      <p>
        Pour naviguer efficacement entre les sujets existants, ils peuvent être triés par date de création ou bien
        par pertinence, et un champ de recherche permet de trouver les thématiques qui ont déjà été abordé.
      </p>

      <p>
        Si vous êtes <a href="#signup">inscris sur CDV</a>, vous pouvez ouvrir un nouveau sujet. Veillez à rechercher
        en premier lieu qu'il n'existe pas déjà parmi les sujets existants, pour éviter les doublons. Dans le cas
        d'une vidéo YouTube, si vous ouvrez un sujet relatif à des mots prononcés ou écrits dans la vidéo, pensez à
        insérer le minutage de cette citation.
      </p>

      <p>
        Pour aller plus vite, vous pouvez ouvrir les réactions d'un sujet directement en cliquant sur le nombre de
        commentaires, en haut à droite de chaque ligne dans la liste. Après avoir ouvert un sujet, il est possible de
        revenir à la liste via le bouton "retour".
      </p>

      <ClearFix />

      <Note>
        Note : la suite de cette page est en cours de réaction...
      </Note>

      <SubTitle>Lire les réactions</SubTitle>

      <pre style={{ width: 0 }}>
        - ouvrir un sujet{'\n'}
        - lire les réponses : nuancer l'information, mettre en perspective, comprendre des opinions différentes, mettre en évidence des biais, apporter des sources, poser des questions{'\n'}
        - quick réactions : favoriser le référencement pour mettre en avant les réactions les plus pertinentes ou les plus controversées{'\n'}
        - modération : signaler les réactions{'\n'}
      </pre>

      <p style={{ display: 'none' }}>
        Les échanges qui se déroulent dans les espaces de commentaires sont uniquement alimenté par la communauté, et
        respectent donc la charte. Ce qui laisse la place aux échanges d'idées dans un cadre collaboratif,
        bienveillant et respectueux, mais se passera des affirmations sans preuves, des blagues et autres trolls.
      </p>

      <p style={{ display: 'none' }}>
        Certaines réactions vont apporter des précisions, vous faire réfléchir, peut-être même vous faire changer
        d'avis ! Si beaucoup d'utilisateurs trouvent une même réaction pertinente, il semble naturel de la mettre en
        avant. Vous pouvez ainsi annoter une réaction existante d'un "J'approuve" 👍, "Je réfute" 👎, ou bien "Je suis
        sceptique..." 🧐, pour donner votre avis, entièrement subjectif. Un algorithme va comptabiliser le nombre total
        d'annotations pour vous présenter les réactions les plus impactantes lorsque vous choisissez de le tri par
        pertinence.
      </p>

      <div style={{ display: 'none' }}>
        <Note>
          Note : réfuter une réaction ne va pas la faire baisser dans le classement. L'algorithme prend en compte
          que vous y avez accordé de l'importance, même si vous n'êtes pas d'accord avec le message.
        </Note>
      </div>

      <SubTitle>Rédiger une réaction</SubTitle>

      <pre style={{ width: 0 }}>
        - respect de la charte : cadrer les débats, zone saine d'écoute et de partage collaboratif{'\n'}
        - scope (sujet, réponse){'\n'}
        - citation{'\n'}
        - format markdown{'\n'}
      </pre>

      <p style={{ display: 'none' }}>
        Et bien sur, si vous avez quelque chose à partager avec la communauté, vous pouvez rédiger une nouvelle
        réaction. Si le sujet de votre message porte sur l'information présente dans la vidéo YouTube, ajoutez le via
        le formulaire présent tout en haut, avant les réactions. Si en revanche vous souhaitez apporter quelque chose
        par rapport à une réaction existante, utilisez le bouton "répondre". Les réponses imbriquées permettent de
        suivre le fil de la discussion et l'évolution du débat.
      </p>

      <p style={{ display: 'none' }}>
        Personne n'est à l'abri d'une erreur ! Vous pouvez, à tout moment, modifier le texte d'une réaction dont vous
        êtes l'auteur, pour en modifier la formulation. Attention cependant garder le sens original du message, de
        manière à ce que l'échange reste cohérent. Après qu'une réaction est publiée, il n'est pas possible de
        l'effacer. Vous avez partagé votre point de vue à un moment donné, mais si votre pensée évolue ultérieurement,
        vous êtes invité(e) à rédiger un nouveau message faisant part de vos découvertes...
      </p>

      <ClearFix />

      <Title>Inscription</Title>

      <pre style={{ width: 0 }}>
        - inscription / authentification (email -> spam){'\n'}
        - mot de passe oublié{'\n'}
        - changement de mot de passe / suppression du compte{'\n'}
      </pre>

    </div>
  );
};

export default Home;
